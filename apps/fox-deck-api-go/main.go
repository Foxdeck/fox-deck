package main

import (
	"fox-deck-api/api/auth"
	"fox-deck-api/database"
	"log"
	"net/http"
)

func initializeRoutes() *http.ServeMux {
	mux := http.NewServeMux()
	auth.AppendRoutes(mux)
	return mux
}

func main() {
	mux := initializeRoutes()

	go func() {
		if err := http.ListenAndServe(":3000", mux); err != nil {
			log.Fatal(err)
			return
		}
		log.Print("Server started on :3000...")
	}()

	select {}
	database.CloseDatabaseConnection()
}
