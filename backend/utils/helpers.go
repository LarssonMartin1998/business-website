/*
Package utils ...
*/
package utils

import (
	"crypto/subtle"
	"encoding/json"
	"log"
	"net/http"
)

type APIResponse struct {
	Success bool   `json:"success"`
	Data    any    `json:"data,omitempty"`
	Error   string `json:"error,omitempty"`
}

func RespondWithJSON(w http.ResponseWriter, status int, success bool, data any, errorMsg string) {
	response := APIResponse{
		Success: success,
		Data:    data,
		Error:   errorMsg,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(response)
}

func MiddlewareAPIAuth(configAPIKey string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			headerAPIKey := r.Header.Get("X-API-Key")
			if headerAPIKey == "" {
				RespondWithJSON(w, http.StatusUnauthorized, false, nil, "Missing API Key")
				log.Printf("Attempt to send request with a missing API Key from: %s", r.RemoteAddr)
				return
			}

			if subtle.ConstantTimeCompare([]byte(headerAPIKey), []byte(configAPIKey)) != 1 {
				RespondWithJSON(w, http.StatusUnauthorized, false, nil, "Invalid API Key")
				log.Printf("Attempt to send request with an invalid API Key from: %s", r.RemoteAddr)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func Must[T any](value T, err error) T {
	if err != nil {
		log.Fatal(err)
	}

	return value
}
