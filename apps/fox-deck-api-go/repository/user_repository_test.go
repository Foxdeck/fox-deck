package repository

import (
	"context"
	"fox-deck-api/database"
	it "fox-deck-api/testing"
	"log"
	"testing"
)

func TestUserRepository_CreateUser_Success(t *testing.T) {
	setup := it.IntegrationTestSetup{}
	container := it.IntegrationTestEnvironment.Startup(&setup)

	host, _ := container.Container.Host(context.Background())
	mappedPort, _ := container.Container.MappedPort(context.Background(), "3306")
	t.Logf("Container started at: %s:%s", host, mappedPort.Port())

	userId := "1d978281-5ffc-48e8-ae40-5c85ab553816"
	username := "1d978281-5ffc-48e8-ae40-5c85ab553816"
	email := "1d978281-5ffc-48e8-ae40-5c85ab553816"
	password := "Secur3P@ssw0rd!"
	user := database.User{
		Id:       userId,
		Username: username,
		Email:    email,
		Password: password,
	}

	defer container.Terminate(context.Background())

	userRepoConn := &UserRepositoryConnection{
		DbConnection: &database.Connection{
			Ip:       host,
			Port:     mappedPort.Port(),
			Username: "root",
			Password: "fdadmin",
		},
	}

	insertedUserId, err := userRepoConn.InsertUser(user)
	if err != nil {
		t.Errorf("Error inserting user: %v", err)
	}

	if *insertedUserId != userId {
		t.Errorf("Expected user ID to be returned, got nil")
	}

	query := `SELECT * FROM User
        	  WHERE id = ?;`

	stmt, err := userRepoConn.DbConnection.Connect().Prepare(query)
	if err != nil {
		t.Fatalf("Error preparing query: %v", err)
	}

	result, err := stmt.Query(userId)
	if result.Err() != nil || err != nil {
		t.Fatalf("Error executing query: %v", result.Err())
	}

	defer result.Close()

	retrievedUser := &database.User{}
	for result.Next() {
		user := &database.User{}
		if err := result.Scan(&user.Id, &user.Email, &user.Username, &user.Password); err != nil {
			log.Fatal(err)
		}

		retrievedUser = user
	}

	if retrievedUser.Id != userId {
		t.Errorf("Expected user ID to be %s, got %s", userId, retrievedUser.Id)
	}

	if retrievedUser.Email != email {
		t.Errorf("Expected email to be %s, got %s", email, retrievedUser.Email)
	}

	if retrievedUser.Username != username {
		t.Errorf("Expected username to be %s, got %s", username, retrievedUser.Username)
	}

	if retrievedUser.Password == password {
		t.Errorf("Expected password to be encrypted, got %s", retrievedUser.Password)
	}
}
