package dir_utils

import (
	"os"
	"path/filepath"
)

// RootDir returns the root directory of the current Go module.
func RootDir() string {
	goMod := os.Getenv("GOMOD")
	rootPath := filepath.Join(goMod, "..")
	absPath, _ := filepath.Abs(rootPath)

	return absPath
}
