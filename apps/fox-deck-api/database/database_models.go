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
	Id               string `json:"id"`
	ParentResourceId string `json:"parent_resource_id"`
	Type             string `json:"type"`
	Name             string `json:"name"`
	Content          string `json:"content"`
	CreatedAt        string `json:"created_at"`
}
