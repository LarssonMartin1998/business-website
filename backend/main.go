package main

import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"net/http"

	"backend/blog"
	"backend/config"
	"backend/router"
	"backend/utils"
)

func main() {
	r := router.New()

	r.SetupRoutes(&router.RoutingContext{
		Providers: []router.RouteProvider{
			blog.NewModule(),
		},
	})

	cfg := utils.Must(config.Load())

	port := ":" + cfg.Port
	var buf bytes.Buffer
	writer := bufio.NewWriter(&buf)
	fmt.Fprintf(writer, "✅Starting HTTP server on port %s\n", port)
	r.WriteRoutes(writer)

	r.ClearRouteTree()

	writer.Flush()
	fmt.Println(buf.String())
	log.Fatal(http.ListenAndServe(port, r.GetHTTPHandler()))
}
