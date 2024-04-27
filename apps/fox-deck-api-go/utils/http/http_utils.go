// Package http_utils provides utility functions for working with HTTP requests and responses.
package http_utils

import (
	"encoding/json"
	"net/http"
)

// WriteJSONResponse is a function that writes a JSON response to the provided http.ResponseWriter.
// It takes three parameters:
//   - responseWriter: The http.ResponseWriter where the JSON response will be written.
//   - httpStatus: The HTTP status code to be set in the response header.
//   - data: The data to be marshaled into JSON format and written to the response.
//
// The function first marshals the data parameter into JSON format using json.Marshal.
// Then, it sets the "Content-Type" header of the response to "application/json".
// Next, it sets the HTTP status code of the response using the WriteHeader method of the responseWriter.
// Finally, it writes the marshaled JSON data to the response using the Write method of the responseWriter.
func WriteJSONResponse(responseWriter http.ResponseWriter, httpStatus int, data interface{}) {
	res, _ := json.Marshal(data)
	responseWriter.Header().Set("Content-Type", "application/json")
	responseWriter.WriteHeader(httpStatus)
	responseWriter.Write(res)
}
