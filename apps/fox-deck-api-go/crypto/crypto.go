package crypto

import (
	"golang.org/x/crypto/bcrypt"
)

type Crypto interface {
	HashPassword(password string) (string, error)
	CompareHashAndPassword(hashedPassword string, password string) bool
}

type BcryptCrypto struct{}

// HashPassword
// Generates a hashed password from a given password string.
// Returns the hashed password as string
func (b *BcryptCrypto) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// CompareHashAndPassword
// Compares a given hashed password with a given password string.
// Returns true, if the passwords are the same
func (b *BcryptCrypto) CompareHashAndPassword(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
