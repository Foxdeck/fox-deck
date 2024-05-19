package mocks

import (
	"fox-deck-api/database"
	"github.com/stretchr/testify/mock"
)

type MockUserRepositoryUserWasFound struct {
	mock.Mock
}

func (m *MockUserRepositoryUserWasFound) GetUserByEmail(email string) (*database.User, error) {
	return &database.User{
		Id:       "a56eb55f-c6e4-4290-ad48-b02a8fbaacea",
		Username: "TheShiveringtester",
		Email:    email,
		Password: "ZtEnTybu",
	}, nil
}

func (m *MockUserRepositoryUserWasFound) InsertUser(user database.User) (*string, error) {
	id := "a56eb55f-c6e4-4290-ad48-b02a8fbaacea"
	return &id, nil
}

type MockUserRepositoryUserWasNotFound struct {
	mock.Mock
}

func (m *MockUserRepositoryUserWasNotFound) GetUserByEmail(email string) (*database.User, error) {
	return nil, nil
}

func (m *MockUserRepositoryUserWasNotFound) InsertUser(user database.User) (*string, error) {
	id := "a56eb55f-c6e4-4290-ad48-b02a8fbaacea"
	return &id, nil
}
