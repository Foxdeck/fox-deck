package swagger

import (
	"fmt"
	httpSwagger "github.com/swaggo/http-swagger/v2"
	"net/http"
)

// todo: baseUrl should not be here...
var (
	baseUrl         = "http://localhost:3000"
	swaggerEndpoint = "swagger"
)

// AppendRoutes
// This functions contains all routes which has something to do with swagger
func AppendRoutes(mux *http.ServeMux) {
	swaggerUrl := fmt.Sprintf("%s/%s/doc.json", baseUrl, swaggerEndpoint)
	mux.Handle("GET /swagger/*", httpSwagger.Handler(
		httpSwagger.URL(swaggerUrl), //The url pointing to API definition
	))
}
