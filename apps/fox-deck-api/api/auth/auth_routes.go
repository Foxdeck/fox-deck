package auth

import (
	"fox-deck-api/middleware"
	"github.com/gorilla/mux"
	"net/http"
)

// AppendRoutes
// This functions contains all routes which has something to do with authentication
func AppendRoutes(mux *mux.Router) {
	mux.HandleFunc("/login", middleware.HttpDurationMiddleware(Login)).Methods(http.MethodPost)
	mux.HandleFunc("/register", middleware.HttpDurationMiddleware(Register)).Methods(http.MethodPost)
}
