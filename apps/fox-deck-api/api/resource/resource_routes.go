package resources

import (
	"fox-deck-api/middleware"
	"github.com/gorilla/mux"
	"net/http"
)

// AppendRoutes
// This functions contains all routes which has something to do with resources
func AppendRoutes(mux *mux.Router) {
	mux.HandleFunc("/resource", middleware.HttpDurationMiddleware(CreateResource)).Methods(http.MethodPost)
	mux.HandleFunc("/resource", middleware.HttpDurationMiddleware(GetResource)).Methods(http.MethodGet)
	mux.HandleFunc("/resource/search", middleware.HttpDurationMiddleware(SearchNoteByName)).Methods(http.MethodGet)
}
