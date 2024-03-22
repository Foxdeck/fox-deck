package logging

import (
	"fmt"
	"log/slog"
	"net/url"
	"runtime/debug"
	"strconv"
	"time"
)

const (
	reset       = "\033[0m"
	lightRed    = 91
	lightYellow = 93
	lightBlue   = 94
)

var logger = slog.Default()

func init() {
	Info("logging", "logger initialized")
	slog.SetDefault(logger)
	slog.SetLogLoggerLevel(slog.LevelDebug)
}

func colorize(colorCode int, v string) string {
	return fmt.Sprintf("\033[%sm%s%s", strconv.Itoa(colorCode), v, reset)
}

// Info
// Prints general information.
func Info(filename string, infoMsg string) {
	message := fmt.Sprintf("(%s) => %s", filename, infoMsg)
	logger.Info(colorize(lightYellow, message))
}

// Debug
// Prints debug information used for error analysis.
func Debug(filename string, debugMsg string) {
	message := fmt.Sprintf("(%s) => %s", filename, debugMsg)
	logger.Debug(colorize(lightBlue, message))
}

// Fatal
// Used for logging error messages. Also prints the stack.
func Fatal(err error) {
	logger.Error(colorize(lightRed, err.Error()), debug.Stack())
}

// HttpController
// Logging for the HttpController. Logs the Route and the time needed to fulfill the request.
func HttpController(method string, url *url.URL, duration time.Duration) {
	message := fmt.Sprintf("[%s] %s - took %dms", method, url.Path, duration.Milliseconds())
	Debug("HTTP Controller", message)
}
