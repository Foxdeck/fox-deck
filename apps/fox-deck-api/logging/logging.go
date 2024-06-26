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
	lightGreen  = 32
)

var logger = slog.Default()

// init initialze the logger
func init() {
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

// Success
// Prints a success message with the provided filename and message.
func Success(filename string, msg string) {
	message := fmt.Sprintf("(%s) => %s", filename, msg)
	logger.Debug(colorize(lightGreen, message))
}

// Fatal
// Used for logging error messages. Also prints the stack and closes the application.
func Fatal(err error) {
	logger.Error(colorize(lightRed, err.Error()), debug.Stack())
}

// Error
// Used for logging error messages without closing the application.
func Error(filename string, msg string) {
	message := fmt.Sprintf("(%s) => %s", filename, msg)
	logger.Error(colorize(lightRed, message))
}

// HttpController
// Logging for the HttpController. Logs the Route and the time needed to fulfill the request.
func HttpController(method string, url *url.URL, duration time.Duration) {
	message := fmt.Sprintf("[%s] %s - took %dms", method, url.Path, duration.Milliseconds())
	Debug("HTTP Controller", message)
}
