package auth

import (
	"fmt"
	"fox-deck-api/crypto"
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
	"fox-deck-api/logging"
	"fox-deck-api/repository"
	"github.com/google/uuid"
)

// AuthenticateUser
// Searches for the user in the database and returns a JWT if user is found.
func AuthenticateUser(loginRequest LoginRequest) (*database.User, error) {
	userRepository := repository.UserRepository{
		DbConnection: database.GetInstance(),
	}

	retrievedUser, err := userRepository.GetInstance().GetUserByEmail(loginRequest.Email)
	if err != nil {
		return nil, err
	}

	// check if the password which the user entered matches with the password in the database
	if !crypto.CompareHashAndPassword(retrievedUser.Password, loginRequest.Password) {
		return nil, &exceptions.AuthenticationError{}
	}

	return retrievedUser, nil
}

// CreateUser
// Creates a new user in the database and returns the created users id.
func CreateUser(registerRequest RegisterRequest) (*string, error) {
	userRepository := repository.UserRepository{
		DbConnection: database.GetInstance(),
	}

	// prevent registration with the same email multiple times
	retrievedUser, err := userRepository.GetInstance().GetUserByEmail(registerRequest.Email)
	if err != nil {
		return nil, err
	}

	if retrievedUser != nil {
		logging.Debug("auth_service", fmt.Sprintf("User found: %#v", retrievedUser))
		return nil, &exceptions.EmailAlreadyUsedError{}
	}

	hashedPassword, err := crypto.HashPassword(registerRequest.Password)
	if err != nil {
		return nil, err
	}

	userId := uuid.New().String()
	user, err := userRepository.InsertUser(database.User{
		Id:       userId,
		Username: registerRequest.Username,
		Email:    registerRequest.Email,
		Password: hashedPassword,
	})
	if err != nil {
		return nil, err
	}

	return user, nil
}
