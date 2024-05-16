package repository

import (
	"fox-deck-api/database"
	"log"
	"sync"
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

	connection := userRepository.DbConnection.Connect()
	query := `SELECT * FROM User 
         	  WHERE email = ?;`

	stmt, err := connection.Prepare(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Query(email)
	if result.Err() != nil || err != nil {
		return nil, result.Err()
	}

	defer result.Close()

	for result.Next() {
		user := &database.User{}
		if err := result.Scan(&user.Id, &user.Email, &user.Username, &user.Password); err != nil {
			log.Fatal(err)
		}

		retrievedUser = user
	}

	// return nil, if no user was found
	if retrievedUser.Id == "" {
		return nil, nil
	}

	// return the user, if a user was found
	return retrievedUser, nil
}

func (userRepository *UserRepositoryConnection) InsertUser(user database.User) (*string, error) {
	connection := userRepository.DbConnection.Connect()
	query := `INSERT into User (id, username, email, password) 
			  VALUES (?, ?, ?, ?);`

	stmt, err := connection.Prepare(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Query(user.Id, user.Username, user.Email, user.Password)
	if result.Err() != nil || err != nil {
		return nil, result.Err()
	}

	defer result.Close()

	return &user.Id, nil
}
