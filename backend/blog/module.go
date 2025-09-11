package blog

import (
	"backend/config"
	"backend/database"
	"backend/router"
	"backend/utils"
)

type Module struct {
	store blogStore
}

func NewModule(db *database.SQLiteDB) *Module {
	return &Module{
		store: newBlogStore(db.GetDB()),
	}
}

func (m *Module) RegisterRoutes(n *router.RouteNode, cfg *config.Config) {
	n.Route("/posts", func(n *router.RouteNode) {
		n.Post("/", m.handleCreatePostReq).With(utils.MiddlewareAPIAuth(cfg.API.Key))
		n.Get("/", m.handleGetPostsReq)
		n.Get("/{id}", m.handleGetPostReq)
		n.Put("/{id}", m.handleUpdatePostReq).With(utils.MiddlewareAPIAuth(cfg.API.Key))
		n.Delete("/{id}", m.handleDeletePostReq).With(utils.MiddlewareAPIAuth(cfg.API.Key))
	})
	n.Route("/rss", func(n *router.RouteNode) {
		n.Get("/", m.handleServeXMLReq)
	})
}
