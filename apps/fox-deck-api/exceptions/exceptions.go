package exceptions

const (
	authenticationErrorMsg   = "AUTHENTICATION_ERROR"
	databaseErrorMsg         = "DATABASE_ERROR"
	unexpectedErrorMsg       = "UNEXPECTED_ERROR"
	resourceNotFoundErrorMsg = "RESOURCE_NOT_FOUND_ERROR"
	emailAlreadyUsedErrorMsg = "EMAIL_ALREADY_USED"
)

type AuthenticationError struct {
	message string
}

func (e *AuthenticationError) Error() string {
	return authenticationErrorMsg
}

type EmailAlreadyUsedError struct {
	message string
}

func (e *EmailAlreadyUsedError) Error() string {
	return emailAlreadyUsedErrorMsg
}

type DatabaseError struct {
	message string
}

func (e *DatabaseError) Error() string {
	return databaseErrorMsg
}

type ResourceNotFoundError struct {
	message string
}

func (e *ResourceNotFoundError) Error() string {
	return resourceNotFoundErrorMsg
}

type UnexpectedError struct {
	message string
}

func (e *UnexpectedError) Error() string {
	return unexpectedErrorMsg
}
