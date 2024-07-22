package main

import (
	"fox-deck-api/api/auth"
	resources "fox-deck-api/api/resource"
	"fox-deck-api/api/swagger"
	"fox-deck-api/database"
	_ "fox-deck-api/docs" // we need to import this as unused for swagger
	"fox-deck-api/logging"
	"github.com/gorilla/mux"
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

	logging.Debug("main", "Initializing routes...")
	router := mux.NewRouter()

	swagger.AppendRoutes(router)
	auth.AppendRoutes(router)
	resources.AppendRoutes(router)
	logging.Debug("main", "Initializing routes finished")

	go func() {
		logging.Debug("main", "Server started on :3000")
		if err := http.ListenAndServe(":3000", router); err != nil {
			logging.Fatal(err)
		}
	}()

	db := database.Connection{}
	defer database.Close(&db)
	select {}
}
