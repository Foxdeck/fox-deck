package database

import (
	"os"
	"path/filepath"
)

const (
	InMemory = ":memory:"
)

func GetDevDatabasePath() string {
	workingDir, _ := os.Getwd()
	return filepath.Join(workingDir, "..", "fox-deck-api", "prisma", "dev.db")
}
