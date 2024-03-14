package exceptions

type AuthenticationError struct {
	message string
}

func (e *AuthenticationError) Error() string {
	return "authentication error"
}

type DatabaseError struct {
	message string
}

func (e *DatabaseError) Error() string {
	return "An error occurred while working with the database"
}
