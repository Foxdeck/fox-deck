package exceptions

const (
	authenticationErrorMsg = "AUTHENTICATION_ERROR"
	databaseErrorMsg       = "DATABASE_ERROR"
	unexpectedErrorMsg     = "UNEXPECTED_ERROR"
)

type AuthenticationError struct {
	message string
}

func (e *AuthenticationError) Error() string {
	return authenticationErrorMsg
}

type DatabaseError struct {
	message string
}

func (e *DatabaseError) Error() string {
	return databaseErrorMsg
}

type UnexpectedError struct {
	message string
}

func (e *UnexpectedError) Error() string {
	return unexpectedErrorMsg
}
