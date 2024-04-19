package database

import (
	"fox-deck-api/logging"
	"sync"
	"zombiezen.com/go/sqlite"
)

type Connection struct {
	DatabasePath string
	connection   *sqlite.Conn
}

var instance *Connection
var once sync.Once

// GetInstance
// Initiate the instance to the database exactly one time.
func GetInstance() *Connection {
	once.Do(func() {
		instance = &Connection{
			DatabasePath: GetDevDatabasePath(),
		}
	})

	return instance
}

// Connect
// Connects to the database and returns its instance.
// If the connection already is established, use these instance.
func (con *Connection) Connect() *sqlite.Conn {
	if con.connection != nil {
		return con.connection
	}

	var databasePath = con.DatabasePath
	conn, err := sqlite.OpenConn(databasePath, sqlite.OpenReadWrite)
	if err != nil {
		logging.Fatal(err)
	}
	con.connection = conn
	logging.Debug("Database", "Connected to database")

	return con.connection
}

// Close
// Closes the established database connection.
func Close(database *Connection) {
	err := database.connection.Close()
	if err != nil {
		logging.Fatal(err)
	}
	logging.Debug("database", "Connection closed")
}
