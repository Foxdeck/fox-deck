package main

import (
	"fox-deck-api/api/auth"
	"fox-deck-api/api/resource"
	"fox-deck-api/api/swagger"
	"fox-deck-api/database"
	_ "fox-deck-api/docs" // we need to import this as unused for swagger
	"fox-deck-api/logging"
	"net/http"
)

// @title   	Foxdeck API
// @version  	1.0
// @description This API handles requests from the Foxdeck App.

// @query.collection.format multi

// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.

// @externalDocs.description  Developer Guide
// @externalDocs.url          https://docs.foxdeck.de
func main() {
	logging.Debug("main", "Starting up fox-deck API...")
	mux := http.NewServeMux()
	registerRoutes(mux)

	go func() {
		if err := http.ListenAndServe(":3000", mux); err != nil {
			logging.Fatal(err)
		}

		logging.Debug("main", "Server started on :3000")
	}()

	db := database.Connection{}
	defer database.Close(&db)
	select {}
}

// registerRoutes initializes the routes for the HTTP server.
//
// Parameters:
//   - mux: The http.ServeMux to register the routes on.
func registerRoutes(mux *http.ServeMux) {
	logging.Debug("main", "Initializing routes...")

	swagger.AppendRoutes(mux)
	auth.AppendRoutes(mux)
	resources.AppendRoutes(mux)

	logging.Debug("main", "Initializing routes finished")
}
