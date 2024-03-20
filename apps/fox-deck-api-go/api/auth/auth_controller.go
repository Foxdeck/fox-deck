package auth

import (
	"encoding/json"
	"errors"
	"net/http"

	"fox-deck-api/exceptions"
	"fox-deck-api/token"
)

func Login(responseWriter http.ResponseWriter, _ *http.Request) {
	var mockLoginRequest = LoginRequest{
		Email:    "dev@dev.de",
		Password: "devdevdev",
	}

	user, err := GetUser(mockLoginRequest)
	if err != nil {
		var unexpectedError *exceptions.UnexpectedError
		var authenticationError *exceptions.AuthenticationError
		var databaseError *exceptions.DatabaseError
		switch {
		case errors.As(err, &authenticationError):
			responseWriter.WriteHeader(http.StatusUnauthorized)
			responseWriter.Write([]byte(err.Error()))
			return
		case errors.As(err, &databaseError):
			responseWriter.WriteHeader(http.StatusInternalServerError)
			responseWriter.Write([]byte(err.Error()))
			return
		default:
			responseWriter.WriteHeader(http.StatusInternalServerError)
			responseWriter.Write([]byte(unexpectedError.Error()))
			return
		}
	}

	jwt, _ := token.CreateToken(user.Id)

	loginResponse := LoginResponse{
		Token: jwt,
	}
	response, _ := json.Marshal(loginResponse)
	responseWriter.Header().Set("Content-Type", "application/json")
	responseWriter.WriteHeader(http.StatusOK)
	responseWriter.Write(response)
}

func Register(responseWriter http.ResponseWriter, _ *http.Request) {
	var mockRegisterRequest = RegisterRequest{
		Email:    "dev@dev.de",
		Username: "dev",
		Password: "devdevdev",
	}

	user, err := InsertUser(mockRegisterRequest)
	if err != nil {
		var unexpectedError *exceptions.UnexpectedError
		var authenticationError *exceptions.AuthenticationError
		var databaseError *exceptions.DatabaseError
		switch {
		case errors.As(err, &authenticationError):
			responseWriter.WriteHeader(http.StatusUnauthorized)
			responseWriter.Write([]byte(err.Error()))
			return
		case errors.As(err, &databaseError):
			responseWriter.WriteHeader(http.StatusInternalServerError)
			responseWriter.Write([]byte(err.Error()))
			return
		default:
			responseWriter.WriteHeader(http.StatusInternalServerError)
			responseWriter.Write([]byte(unexpectedError.Error()))
			return
		}
	}

	response := RegisterResponse{
		Id: *user,
	}
	jsonResponse, _ := json.Marshal(response)
	responseWriter.Header().Set("Content-Type", "application/json")
	responseWriter.WriteHeader(http.StatusCreated)
	responseWriter.Write(jsonResponse)
}
