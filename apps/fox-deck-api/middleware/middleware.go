package middleware

import (
	"net/http"
	"time"

	"fox-deck-api/logging"
)

// HttpDurationMiddleware
// Measures the duration an HTTP Request needed and logs it into the console.
func HttpDurationMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()

		// after the function, which the middleware should call, was called this is being executed
		defer func() {
			endTime := time.Now()
			duration := endTime.Sub(startTime)
			logging.HttpController(r.Method, r.URL, duration)
		}()

		next(w, r)
	}
}
