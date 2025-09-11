/*
Package contact
*/
package contact

import (
	"backend/config"
	"backend/router"
)

type Module struct {
	cfg *config.Config
}

func NewModule(cfg *config.Config) *Module {
	return &Module{
		cfg,
	}
}

func (m *Module) RegisterRoutes(n *router.RouteNode, cfg *config.Config) {
	n.Route("/contact", func(n *router.RouteNode) {
		n.Post("/", m.handleSendMailRequest)
	})
}
