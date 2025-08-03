package blog

import (
	"backend/router"
)

type Module struct {
	store blogStore
}

func NewModule() *Module {
	return &Module{
		store: newBlogStore(),
	}
}

func (m *Module) Init() {
	// Load database store
}

func (m *Module) RegisterRoutes(n *router.RouteNode) {
	n.Route("/posts", func(n *router.RouteNode) {
		n.Post("/", m.createPost)
		n.Get("/", m.getPosts)
		n.Get("/{id}", m.getPost)
		n.Put("/{id}", m.updatePost)
		n.Delete("/{id}", m.deletePost)
	})
}
