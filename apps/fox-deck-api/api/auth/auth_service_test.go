package auth

import (
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
	"fox-deck-api/mocks"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestAuthenticateUserIfUserExists(t *testing.T) {
	mockUserRepository := new(mocks.MockUserRepositoryUserWasFound)
	mockCrypto := new(mocks.MockCryptoWithAccess)

	loginRequest := LoginRequest{
		Email:    "theshiveringtester@gmail.com",
		Password: "ZtEnTybu",
	}

	user, err := AuthenticateUser(mockUserRepository, mockCrypto, loginRequest)

	assert.Nil(t, err)
	assert.Equal(t, &database.User{
		Id:       "a56eb55f-c6e4-4290-ad48-b02a8fbaacea",
		Username: "TheShiveringtester",
		Email:    "theshiveringtester@gmail.com",
		Password: "ZtEnTybu",
	}, user)
}

func TestAuthenticateUserIfUserNotExists(t *testing.T) {
	mockUserRepository := new(mocks.MockUserRepositoryUserWasNotFound)
	mockCrypto := new(mocks.MockCryptoWithoutAccess)

	loginRequest := LoginRequest{
		Email:    "theshiveringtester@gmail.com",
		Password: "ZtEnTybu",
	}

	_, err := AuthenticateUser(mockUserRepository, mockCrypto, loginRequest)

	assert.Equal(t, &exceptions.AuthenticationError{}, err)
}

func TestCreateUserIfEmailAlreadyUsed(t *testing.T) {
	mockUserRepository := new(mocks.MockUserRepositoryUserWasFound)
	mockCrypto := new(mocks.MockCryptoWithAccess)

	registerRequest := RegisterRequest{
		Email:    "theshiveringtester@gmail.com",
		Username: "TheShiveringtest",
		Password: "ZtEnTybu",
	}

	_, err := CreateUser(mockUserRepository, mockCrypto, registerRequest)

	assert.Equal(t, &exceptions.EmailAlreadyUsedError{}, err)
}

func TestCreateUserIfEmailIsNotUsed(t *testing.T) {
	mockUserRepository := new(mocks.MockUserRepositoryUserWasNotFound)
	mockCrypto := new(mocks.MockCryptoWithoutAccess)

	registerRequest := RegisterRequest{
		Email:    "theshiveringtester@gmail.com",
		Username: "TheShiveringtest",
		Password: "ZtEnTybu",
	}

	user, err := CreateUser(mockUserRepository, mockCrypto, registerRequest)

	assert.Nil(t, err)
	assert.Equal(t, "a56eb55f-c6e4-4290-ad48-b02a8fbaacea", *user)
}
