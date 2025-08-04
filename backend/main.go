package main

import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"net/http"
	"time"

	"backend/blog"
	"backend/config"
	"backend/database"
	"backend/router"
	"backend/utils"
)

func main() {
	cfg := utils.Must(config.Load())
	db := utils.Must(database.NewSQLiteDB(cfg))
	r := router.New()

	r.SetupRoutes(&router.RoutingContext{
		Providers: []router.RouteProvider{
			blog.NewModule(db),
		},
	}, cfg)

	port := ":" + cfg.Port
	var buf bytes.Buffer
	writer := bufio.NewWriter(&buf)
	fmt.Fprintf(writer, "✅Starting HTTP server on port %s\n", port)
	r.WriteRoutes(writer)

	r.ClearRouteTree()

	writer.Flush()
	fmt.Println(buf.String())

	server := &http.Server{
		Addr:           port,
		Handler:        r.GetHTTPHandler(),
		ReadTimeout:    15 * time.Second,
		WriteTimeout:   15 * time.Second,
		IdleTimeout:    60 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1 MB
	}
	log.Fatal(server.ListenAndServe())
}
