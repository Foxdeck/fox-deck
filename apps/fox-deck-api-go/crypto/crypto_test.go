package crypto

import (
	"testing"
)

func TestCompareHashAndPassword(t *testing.T) {
	password := "myPa$$word!"
	result, _ := HashPassword(password)
	if password == result {
		t.Errorf("(TestCompareHashAndPassword) => password is not hashed")
	}
}
