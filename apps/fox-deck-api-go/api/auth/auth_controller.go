package auth

import (
	"encoding/json"
	"errors"
	"net/http"

	"fox-deck-api/exceptions"
	"fox-deck-api/token"
	"fox-deck-api/utils"
)

func Login(responseWriter http.ResponseWriter, request *http.Request) {
	loginRequest := LoginRequest{}
	err := json.NewDecoder(request.Body).Decode(&loginRequest)
	if err != nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusBadRequest, &exceptions.UnexpectedError{})
		return
	}

	user, err := GetUser(loginRequest)
	if err != nil {
		var authenticationError *exceptions.AuthenticationError
		var databaseError *exceptions.DatabaseError
		switch {
		case errors.As(err, &authenticationError):
			http_utils.WriteJSONResponse(responseWriter, http.StatusUnauthorized, err.Error())
			return
		case errors.As(err, &databaseError):
			http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, err.Error())
			return
		default:
			// if some error we don't expect is thrown, we will only send an "Unexpected error"
			http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.UnexpectedError{})
			return
		}
	}

	jwt, _ := token.CreateToken(user.Id)
	response, _ := json.Marshal(LoginResponse{
		Token: jwt,
	})
	http_utils.WriteJSONResponse(responseWriter, http.StatusOK, response)
}

func Register(responseWriter http.ResponseWriter, request *http.Request) {
	registerRequest := RegisterRequest{}
	err := json.NewDecoder(request.Body).Decode(&registerRequest)
	if err != nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusBadRequest, &exceptions.UnexpectedError{})
		return
	}

	user, err := InsertUser(registerRequest)
	if err != nil {
		var authenticationError *exceptions.AuthenticationError
		var databaseError *exceptions.DatabaseError
		var emailAlreadyUsedError *exceptions.EmailAlreadyUsedError
		switch {
		case errors.As(err, &authenticationError):
			http_utils.WriteJSONResponse(responseWriter, http.StatusUnauthorized, err.Error())
			return
		case errors.As(err, &databaseError):
			http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, err.Error())
			return
		case errors.As(err, &emailAlreadyUsedError):
			http_utils.WriteJSONResponse(responseWriter, http.StatusConflict, err.Error())
			return
		default:
			// if some error we don't expect is thrown, we will only send an "Unexpected error"
			http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.UnexpectedError{})
			return
		}
	}

	response, _ := json.Marshal(RegisterResponse{
		Id: *user,
	})
	http_utils.WriteJSONResponse(responseWriter, http.StatusCreated, response)
}
