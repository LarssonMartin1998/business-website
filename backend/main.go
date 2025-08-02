package main

import (
	"bufio"
	"bytes"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/blog"
	"backend/router"
)

func main() {
	r := router.New()

	r.SetupRoutes(&router.RoutingContext{
		Providers: []router.RouteProvider{
			blog.NewModule(),
		},
	})

	port, err := getServerPort()
	if err != nil {
		log.Fatal(err)
	}
	port = ":" + port

	var buf bytes.Buffer
	writer := bufio.NewWriter(&buf)
	fmt.Fprintf(writer, "✅Starting HTTP server on port %s\n", port)
	r.WriteRoutes(writer)

	r.ClearRouteTree()

	writer.Flush()
	fmt.Println(buf.String())
	log.Fatal(http.ListenAndServe(port, r.GetHTTPHandler()))
}

func getServerPort() (port string, err error) {
	args := os.Args[1:]

	if len(args) != 1 {
		err = errors.New("a single flag which sets the server environment must be passed: [--dev, -d] | [--qa, -q] | [--prod, -p]")
		return
	}

	switch args[0] {
	case "--dev", "-d":
		port = "3000"
	case "--qa", "-q":
		port = "8081"
	case "--prod", "-p":
		port = "8080"
	default:
		err = fmt.Errorf("Unknown flag passed: %s", args[0])
	}

	return
}
