package auth

import (
	"github.com/google/uuid"
	"zombiezen.com/go/sqlite"
	"zombiezen.com/go/sqlite/sqlitex"

	"fox-deck-api/crypto"
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
)

// GetUser
// Searches for the user in the database and returns a JWT if user is found.
func GetUser(loginRequest LoginRequest) (*database.User, error) {
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
			loginRequest.Email,
		},
	}
	connection := database.GetDatabaseConnection()
	query := `SELECT * FROM User 
         	  WHERE email = ?;`
	err := sqlitex.Execute(connection, query, selectOptions)
	if err != nil {
		return nil, &exceptions.DatabaseError{}
	}

	// check if the password which the user entered matches with the password in the database
	if !crypto.CompareHashAndPassword(retrievedUser.Password, loginRequest.Password) {
		return nil, &exceptions.AuthenticationError{}
	}

	return retrievedUser, nil
}

// InsertUser
// Creates a new user in the database and returns the created users id.
func InsertUser(registerRequest RegisterRequest) (*string, error) {
	hashedPassword, err := crypto.HashPassword(registerRequest.Password)
	if err != nil {
		return nil, err
	}

	userId := uuid.New().String()

	insertOptions := &sqlitex.ExecOptions{
		Args: []any{
			userId,
			registerRequest.Username,
			registerRequest.Email,
			hashedPassword,
		},
	}
	connection := database.GetDatabaseConnection()
	query := `INSERT into User (id, username, email, password) 
			  VALUES (?, ?, ?, ?);`
	err = sqlitex.Execute(connection, query, insertOptions)
	if err != nil {
		return nil, &exceptions.DatabaseError{}
	}

	return &userId, nil
}
