package repository

import (
	"context"
	"database/sql"
	"fox-deck-api/database"
	it "fox-deck-api/testing"
	"github.com/stretchr/testify/assert"
	"log"
	"testing"
)

func TestUserRepository_CreateUser_Success(t *testing.T) {
	// test-container startup
	setup := it.IntegrationTestSetup{}
	container := it.IntegrationTestEnvironment.Startup(&setup)

	host, _ := container.Container.Host(context.Background())
	mappedPort, _ := container.Container.MappedPort(context.Background(), "3306")

	// the user, we want to insert
	newUser := database.User{
		Id:       "1d978281-5ffc-48e8-ae40-5c85ab553816",
		Username: "John.doe94",
		Email:    "john.doe94@gmail.com",
		Password: "Secur3P@ssw0rd!",
	}

	userRepoConn := &UserRepositoryConnection{
		DbConnection: &database.Connection{
			Ip:       host,
			Port:     mappedPort.Port(),
			Username: "root",
			Password: "fdadmin",
		},
	}

	_, err := userRepoConn.InsertUser(newUser)
	if err != nil {
		t.Errorf("Error inserting newUser: %v", err)
	}

	// check if the user is really inserted
	retrievedUser := fetchUserDetails(userRepoConn.DbConnection.Connect(), newUser.Id)

	assert.Equalf(t, retrievedUser.Id, newUser.Id, "Expected user ID to be %s, got %s", newUser.Id, retrievedUser.Id)
	assert.Equalf(t, retrievedUser.Email, newUser.Email, "Expected email to be %s, got %s", newUser.Email, retrievedUser.Email)
	assert.Equalf(t, retrievedUser.Username, newUser.Username, "Expected username to be %s, got %s", newUser.Username, retrievedUser.Username)
	assert.NotEqualf(t, retrievedUser.Password, newUser.Password, "Expected password to be encrypted, got %s", retrievedUser.Password)
}

func fetchUserDetails(db *sql.DB, userID string) *database.User {
	query := `SELECT * FROM User WHERE id = ?;`
	stmt, err := db.Prepare(query)
	if err != nil {
		log.Fatalf("Error preparing query: %v", err)
	}
	defer stmt.Close()

	result, err := stmt.Query(userID)
	if err != nil {
		log.Fatalf("Error executing query: %v", err)
	}
	defer result.Close()

	retrievedUser := &database.User{}
	for result.Next() {
		user := &database.User{}
		if err := result.Scan(&user.Id, &user.Username, &user.Email, &user.Password); err != nil {
			log.Fatal(err)
		}
		retrievedUser = user
	}

	return retrievedUser
}
