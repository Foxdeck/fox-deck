package mocks

import "github.com/stretchr/testify/mock"

type MockCryptoWithAccess struct {
	mock.Mock
}

func (*MockCryptoWithAccess) CompareHashAndPassword(hashedPassword string, password string) bool {
	return true
}

func (*MockCryptoWithAccess) HashPassword(password string) (string, error) {
	return "de11ce57c069bc90633c91c2ce4d25c38b72d5664a6f0da7e15b13573a922156f24c2472c7a58b73b137b1b0a66a92b1d882cf8d647cd6dceee49f7895a27d31", nil
}

type MockCryptoWithoutAccess struct {
	mock.Mock
}

func (*MockCryptoWithoutAccess) CompareHashAndPassword(hashedPassword string, password string) bool {
	return false
}

func (*MockCryptoWithoutAccess) HashPassword(password string) (string, error) {
	return "de11ce57c069bc90633c91c2ce4d25c38b72d5664a6f0da7e15b13573a922156f24c2472c7a58b73b137b1b0a66a92b1d882cf8d647cd6dceee49f7895a27d31", nil
}
