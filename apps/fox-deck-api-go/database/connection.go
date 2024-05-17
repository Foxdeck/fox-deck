package database

import (
	"database/sql"
	"fmt"
	"fox-deck-api/logging"
	_ "github.com/go-sql-driver/mysql"
	"sync"
	"time"
)

type Connection struct {
	Ip         string
	Port       string
	Username   string
	Password   string
	connection *sql.DB
}

var instance *Connection
var once sync.Once

// GetInstance
// Initiate the instance to the database exactly one time.
func GetInstance() *Connection {
	once.Do(func() {
		instance = &Connection{
			Ip:       "localhost",
			Port:     "3306",
			Username: "root",
			Password: "fdadmin",
		}
	})

	return instance
}

// Connect
// Connects to the database and returns its instance.
// If the connection already is established, use these instance.
func (con *Connection) Connect() *sql.DB {
	// todo: put login data into .env file!
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/foxdeck?parseTime=true", con.Username, con.Password, con.Ip, con.Port)
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
