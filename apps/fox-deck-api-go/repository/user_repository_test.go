package repository

import (
	it "fox-deck-api/testing"
	"testing"
)

func TestCreateUser(t *testing.T) {
	setup := it.IntegrationTestSetup{
		//AdditionalScripts: &[]string{it.GetMigrationFile("foo")},
	}
	_ = it.IntegrationTestEnvironment.Startup(&setup)
}
