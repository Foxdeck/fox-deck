package database

import (
	"fox-deck-api/logging"
	"os"
	"path/filepath"
	"zombiezen.com/go/sqlite"
)

func GetDatabaseConnection() *sqlite.Conn {
	workingDir, _ := os.Getwd()

	// Here, we use filepath.Join to create a platform-safe file workingDir
	var databasePath = filepath.Join(workingDir, "..", "fox-deck-api", "prisma", "dev.db")
	conn, err := sqlite.OpenConn(databasePath, sqlite.OpenReadWrite)
	if err != nil {
		logging.Fatal(err)
	}

	return conn
}

func CloseDatabaseConnection() {
	GetDatabaseConnection().Close()
}
