package database

import (
	"database/sql"
	"fox-deck-api/logging"
	_ "github.com/go-sql-driver/mysql"
	"sync"
	"time"
)

type Connection struct {
	DatabasePath string
	connection   *sql.DB
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
func (con *Connection) Connect() *sql.DB {
	// todo: put login data into .env file!
	dsn := "root:fdadmin@tcp(localhost:3306)/foxdeck?parseTime=true"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic("Error opening database connection: " + err.Error())
	}

	err = db.Ping()
	if err != nil {
		panic("Error connecting to database: " + err.Error())
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	if con.connection != nil {
		return con.connection
	}

	con.connection = db
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
