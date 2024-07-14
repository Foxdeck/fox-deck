package auth

import (
	"fox-deck-api/crypto"
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
	"github.com/google/uuid"
)

// AuthenticateUser
// Searches for the user in the database and returns a JWT if user is found.
func AuthenticateUser(userRepository UserRepository, crypto crypto.Crypto, loginRequest LoginRequest) (*database.User, error) {
	retrievedUser, err := userRepository.GetUserByEmail(loginRequest.Email)
	if retrievedUser == nil {
		return nil, &exceptions.AuthenticationError{}
	}
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
func CreateUser(userRepository UserRepository, crypto crypto.Crypto, registerRequest RegisterRequest) (*string, error) {
	// prevent registration with the same email multiple times
	retrievedUser, err := userRepository.GetUserByEmail(registerRequest.Email)
	if err != nil {
		return nil, err
	}

	if retrievedUser != nil {
		return nil, &exceptions.EmailAlreadyUsedError{}
	}

	if err != nil {
		return nil, err
	}

	userId := uuid.New().String()
	_, err = userRepository.InsertUser(database.User{
		Id:       userId,
		Username: registerRequest.Username,
		Email:    registerRequest.Email,
		Password: registerRequest.Password,
	})
	if err != nil {
		return nil, &exceptions.DatabaseError{}
	}

	return &userId, nil
}
