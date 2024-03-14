package auth

import (
	"fox-deck-api/middleware"
	"net/http"
)

// AppendRoutes
// This functions contains all routes which has something to do with authentication
func AppendRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/login", middleware.HttpDurationMiddleware(Login))
	mux.HandleFunc("/register", middleware.HttpDurationMiddleware(Register))
}
