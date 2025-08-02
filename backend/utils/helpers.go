/*
Package utils ...
*/
package utils

import (
	"encoding/json"
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
