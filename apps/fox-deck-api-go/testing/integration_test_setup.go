// Package testing provides utility functions for testing purposes.
package testing

import (
	"context"
	"fmt"
	"fox-deck-api/logging"
	"fox-deck-api/utils/dir"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/mysql"
	"github.com/testcontainers/testcontainers-go/wait"
	"os"
	"path/filepath"
)

// IntegrationTestSetup represents the additional configurations required to
// establish an integration testing environment using Testcontainers.
type IntegrationTestSetup struct {

	// AdditionalScripts is an optional field that accepts pointer to a slice of strings.
	// The strings in the slice should contain the paths of any additional scripts
	// that need to be executed for the configuration of the testing environment.
	// If there are no additional scripts, this field could be set to nil.
	AdditionalScripts *[]string
}

type IntegrationTestEnvironment interface {
	Startup() *mysql.MySQLContainer
}

// Startup initializes and starts a MySQLContainer for integration testing purposes.
// It returns the reference to the started container.
//
// An instance of MySQLContainer is created using the mysql.RunContainer method from Testcontainers library.
// The container is configured with MySQL  root username, and password "password".
//
// Example usage:
//
//	setup := IntegrationTestSetup{
//	    AdditionalScripts: &[]string{"path/to/custom-script.sql"},
//	}
//	// Use the container for integration testing.
//	container := setup.Startup()
//
// The container will be terminated automatically.
func (setup *IntegrationTestSetup) Startup() *mysql.MySQLContainer {
	mysqlContainerImage := "mysql:8.0.36" // this image should be the same as in 'db.Dockerfile'
	dbUsername := "root"
	dbPassword := "fdadmin"
	ctx := context.Background()

	// todo: we should read every file from the 'migrations'-directory
	scripts := []string{filepath.Join(GetMigrationFile("1_0_0-setup-db.sql"))}

	if setup.AdditionalScripts != nil {
		scripts = append(scripts, *setup.AdditionalScripts...)
	}

	mysqlContainer, err := mysql.RunContainer(ctx,
		testcontainers.WithImage(mysqlContainerImage),
		testcontainers.WithEnv(map[string]string{
			"MYSQL_ROOT_PASSWORD": "fdadmin",
		}),
		testcontainers.WithWaitStrategy(wait.ForAll(
			wait.ForListeningPort("3306")),
		),
		mysql.WithUsername(dbUsername),
		mysql.WithPassword(dbPassword),
		mysql.WithScripts(scripts...),
	)

	if err != nil {
		logging.Fatal(err)
	}

	// clean up the container after the test run
	//defer func() {
	//	if err := mysqlContainer.Terminate(ctx); err != nil {
	//		logging.Fatal(err)
	//	}
	//}()

	return mysqlContainer
}

// GetMigrationFile returns the full path of a migration file based on its filename.
// It checks if the file exists in the migrations directory and returns the full path if found.
// Otherwise, it logs a debug message with the filename and returns an empty string.
//
// Example usage:
//
//	filepath.Join(GetMigrationFile("1_0_0-setup-db.sql"))
func GetMigrationFile(filename string) string {
	baseDir := filepath.Join(dir_utils.RootDir(), "..", "fox-deck-db", "migrations", filename)
	if _, err := os.Stat(baseDir); os.IsNotExist(err) {
		logging.Error("integration_test_setup", fmt.Sprintf("Migration '%s' does not exist", baseDir))
		return ""
	}
	logging.Success("integration_test_setup", fmt.Sprintf("Migration '%s' found", baseDir))
	return baseDir
}
