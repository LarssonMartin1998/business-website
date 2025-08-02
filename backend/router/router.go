/*
Package router ...
*/
package router

import (
	"fmt"
	"io"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"backend/utils"
)

type HTTPMethod string

const (
	GET       HTTPMethod = "GET"
	POST      HTTPMethod = "POST"
	PUT       HTTPMethod = "PUT"
	DELETE    HTTPMethod = "DELETE"
	Undefined HTTPMethod = "Undefined"
)

type requestInfo struct {
	method HTTPMethod
	route  string
}

type RouteNode struct {
	children []*RouteNode
	info     requestInfo
	handler  func(w http.ResponseWriter, r *http.Request)
}

func (n *RouteNode) newRouteNode(method HTTPMethod, pattern string, handler func(w http.ResponseWriter, r *http.Request)) *RouteNode {
	newNode := RouteNode{
		info: requestInfo{
			method: method,
			route:  pattern,
		},
		handler: handler,
	}

	n.children = append(n.children, &newNode)

	return &newNode
}

type routerWrapped struct {
	internal  *chi.Mux
	routeTree *[]*RouteNode
}

type RouteProvider interface {
	RegisterRoutes(r *RouteNode)
}

type RoutingContext struct {
	Providers []RouteProvider
}

func New() *routerWrapped {
	chiRouter := chi.NewRouter()
	chiRouter.Use(middleware.Logger)
	chiRouter.Use(middleware.Recoverer)
	chiRouter.Use(middleware.RequestID)
	chiRouter.Use(middleware.RealIP)

	routeTree := make([]*RouteNode, 1, 10)
	routeTree[0] = &RouteNode{
		info: requestInfo{
			method: Undefined,
			route:  "",
		},
	}

	return &routerWrapped{
		internal:  chiRouter,
		routeTree: &routeTree,
	}
}

func (r *routerWrapped) GetHTTPHandler() *chi.Mux {
	return r.internal
}

func (r *routerWrapped) SetupRoutes(context *RoutingContext) {
	const version = "v1"
	const apiRoot = "/api" + "/" + version

	root := (*r.routeTree)[0]
	root.Route(apiRoot, func(n *RouteNode) {
		for _, v := range context.Providers {
			v.RegisterRoutes(n)
		}
	})

	root.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		utils.RespondWithJSON(w, http.StatusOK, true, map[string]string{"status": "healthy"}, "")
	})

	r.registerWithChi(root, "")
}

func (r *routerWrapped) ClearRouteTree() {
	r.routeTree = nil
}

func (r *routerWrapped) WriteRoutes(writer io.Writer) {
	root := (*r.routeTree)[0]
	r.writeRoute(writer, root, "")
}

func (r *routerWrapped) writeRoute(writer io.Writer, node *RouteNode, basePath string) {
	currentPath := basePath + node.info.route

	if node.handler != nil && node.info.method != Undefined {
		_, err := fmt.Fprintf(writer, "  %s %s\n", node.info.method, currentPath)
		if err != nil {
			return
		}
	}

	for _, child := range node.children {
		r.writeRoute(writer, child, currentPath)
	}
}

func (r *routerWrapped) registerWithChi(node *RouteNode, basePath string) {
	currentPath := basePath + node.info.route

	if node.info.method == Undefined && node.handler == nil && len(node.children) > 0 && len(currentPath) > 0 {
		r.internal.Route(currentPath, func(subrouter chi.Router) {
			// Create a temporary wrapper for the subrouter to register children
			subWrapper := &routerWrapped{internal: subrouter.(*chi.Mux)}
			for _, child := range node.children {
				subWrapper.registerWithChi(child, "")
			}
		})
		return
	}

	if node.handler != nil {
		switch node.info.method {
		case GET:
			r.internal.Get(currentPath, node.handler)
		case POST:
			r.internal.Post(currentPath, node.handler)
		case PUT:
			r.internal.Put(currentPath, node.handler)
		case DELETE:
			r.internal.Delete(currentPath, node.handler)
		}
		return
	}

	// For other cases, recursively register children with current path
	for _, child := range node.children {
		r.registerWithChi(child, currentPath)
	}
}

func (n *RouteNode) Route(pattern string, f func(*RouteNode)) {
	f(n.newRouteNode(Undefined, pattern, nil))
}

func (n *RouteNode) Get(pattern string, f func(w http.ResponseWriter, r *http.Request)) {
	n.newRouteNode(GET, pattern, f)
}

func (n *RouteNode) Post(pattern string, f func(w http.ResponseWriter, r *http.Request)) {
	n.newRouteNode(POST, pattern, f)
}

func (n *RouteNode) Put(pattern string, f func(w http.ResponseWriter, r *http.Request)) {
	n.newRouteNode(PUT, pattern, f)
}

func (n *RouteNode) Delete(pattern string, f func(w http.ResponseWriter, r *http.Request)) {
	n.newRouteNode(DELETE, pattern, f)
}
