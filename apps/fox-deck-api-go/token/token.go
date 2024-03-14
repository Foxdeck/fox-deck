package token

import (
	"fox-deck-api/logging"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

var secretKey = []byte("secret-key")

func CreateToken(id string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":  id,
			"exp": time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		logging.Fatal(err)
		return "", err
	}

	return tokenString, nil
}
