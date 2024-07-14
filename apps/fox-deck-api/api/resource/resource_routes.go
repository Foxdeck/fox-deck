package resources

import (
	"fox-deck-api/middleware"
	"net/http"
)

// AppendRoutes
// This functions contains all routes which has something to do with resources
func AppendRoutes(mux *http.ServeMux) {
	mux.HandleFunc("POST /resource", middleware.HttpDurationMiddleware(CreateResource))
	mux.HandleFunc("GET /resource", middleware.HttpDurationMiddleware(GetResource))
	mux.HandleFunc("GET /resource/search", middleware.HttpDurationMiddleware(SearchNoteByName))
}
