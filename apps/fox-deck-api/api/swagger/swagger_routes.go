package swagger

import (
	"github.com/gorilla/mux"
	httpSwagger "github.com/swaggo/http-swagger/v2"
	"net/http"
)

// AppendRoutes
// This functions contains all routes which has something to do with swagger
func AppendRoutes(router *mux.Router) {
	router.PathPrefix("/swagger").Handler(httpSwagger.Handler(
		httpSwagger.URL("http://localhost:3000/swagger/doc.json"),
		httpSwagger.DeepLinking(true),
		httpSwagger.DocExpansion("none"),
		httpSwagger.DomID("swagger-ui"),
		httpSwagger.PersistAuthorization(true),
	)).Methods(http.MethodGet)
}
