package database

// User
// Represents the 'User'-Table from the database
type User struct {
	Id       string
	Username string
	Email    string
	Password string
}

// Resource
// Represents the 'Resource'-Table from the database
type Resource struct {
	Id               string
	ParentResourceId string
	Type             string
	Name             string
	Content          string
	CreatedAt        string
}
