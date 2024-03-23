package repository

import (
	"fox-deck-api/database"
	"sync"
	"zombiezen.com/go/sqlite"
	"zombiezen.com/go/sqlite/sqlitex"
)

type UserRepositoryConnection struct {
	DbConnection *database.Connection
}

type UserRepository interface {
	GetUserByEmail(email string) (*database.User, error)
	InsertUser(user database.User) (*string, error)
}

var instance *UserRepositoryConnection
var once sync.Once

// GetInstance
// Initiate the instance to the database exactly one time.
func (userRepository *UserRepositoryConnection) GetInstance() *UserRepositoryConnection {
	once.Do(func() {
		instance = &UserRepositoryConnection{
			DbConnection: userRepository.DbConnection,
		}
	})

	return instance
}

// GetUserByEmail
// Retrieves a user by an email.
func (userRepository *UserRepositoryConnection) GetUserByEmail(email string) (*database.User, error) {
	retrievedUser := &database.User{}

	selectOptions := &sqlitex.ExecOptions{
		ResultFunc: func(stmt *sqlite.Stmt) error {
			retrievedUser.Id = stmt.ColumnText(0)
			retrievedUser.Username = stmt.ColumnText(1)
			retrievedUser.Email = stmt.ColumnText(2)
			retrievedUser.Password = stmt.ColumnText(3)
			return nil
		},
		Args: []interface{}{
			email,
		},
	}

	connection := userRepository.DbConnection.Connect()
	query := `SELECT * FROM User 
         	  WHERE email = ?;`
	err := sqlitex.Execute(connection, query, selectOptions)
	if err != nil {
		return nil, err
	}

	// return nil, if no user was found
	if retrievedUser.Id == "" {
		return nil, nil
	}

	// return the user, if a user was found
	return retrievedUser, nil
}

func (userRepository *UserRepositoryConnection) InsertUser(user database.User) (*string, error) {
	insertOptions := &sqlitex.ExecOptions{
		Args: []any{
			user.Id,
			user.Username,
			user.Email,
			user.Password,
		},
	}

	connection := userRepository.DbConnection.Connect()
	query := `INSERT into User (id, username, email, password) 
			  VALUES (?, ?, ?, ?);`
	err := sqlitex.Execute(connection, query, insertOptions)
	if err != nil {
		return nil, err
	}

	return &user.Id, nil
}
