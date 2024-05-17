package main

import (
	"fox-deck-api/api/auth"
	"fox-deck-api/api/resource"
	"fox-deck-api/database"
	_ "fox-deck-api/docs"
	"fox-deck-api/logging"
	httpSwagger "github.com/swaggo/http-swagger/v2"
	"net/http"
)

func initializeRoutes() *http.ServeMux {
	logging.Debug("main", "Initializing routes...")
	mux := http.NewServeMux()
	// Link Swagger documentation
	mux.Handle("GET /swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:3000/swagger/doc.json"), //The url pointing to API definition
	))
	auth.AppendRoutes(mux)
	resources.AppendRoutes(mux)
	logging.Debug("main", "Finished initializing routes...")
	return mux
}

// @title   	Foxdeck API
// @version  	1.0
// @description This API handles requests from the Foxdeck App.

// @query.collection.format multi

// @securityDefinitions.basic  BasicAuth

// @externalDocs.description  Developer Guide
// @externalDocs.url          https://docs.foxdeck.de
func main() {
	mux := initializeRoutes()

	go func() {
		if err := http.ListenAndServe(":3000", mux); err != nil {
			logging.Fatal(err)
		}
		logging.Debug("main", "Server started on :3000...")
	}()

	db := database.Connection{}
	defer database.Close(&db)
	select {}
}
