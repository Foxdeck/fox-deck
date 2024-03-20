package auth

import (
	"encoding/json"
	"errors"
	"net/http"

	"fox-deck-api/exceptions"
	"fox-deck-api/token"
)

func Login(responseWriter http.ResponseWriter, request *http.Request) {
	loginRequest := LoginRequest{}
	err := json.NewDecoder(request.Body).Decode(&loginRequest)
	if err != nil {
		responseWriter.WriteHeader(http.StatusBadRequest)
		responseWriter.Write([]byte(err.Error()))
		return
	}

	user, err := GetUser(loginRequest)
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

func Register(responseWriter http.ResponseWriter, request *http.Request) {
	registerRequest := RegisterRequest{}
	err := json.NewDecoder(request.Body).Decode(&registerRequest)
	if err != nil {
		responseWriter.WriteHeader(http.StatusBadRequest)
		responseWriter.Write([]byte(err.Error()))
		return
	}

	user, err := InsertUser(registerRequest)
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
