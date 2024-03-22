package main

import (
	"fox-deck-api/api/auth"
	"fox-deck-api/database"
	"fox-deck-api/logging"
	"net/http"
)

func initializeRoutes() *http.ServeMux {
	logging.Debug("main", "Initializing routes...")
	mux := http.NewServeMux()
	auth.AppendRoutes(mux)
	return mux
}

func main() {

	mux := initializeRoutes()

	go func() {
		if err := http.ListenAndServe(":3000", mux); err != nil {
			logging.Fatal(err)
		}
		logging.Debug("main", "Server started on :3000...")
	}()

	db := database.Connection{DatabasePath: database.GetDevDatabasePath()}
	defer database.Close(&db)
	select {}
}
