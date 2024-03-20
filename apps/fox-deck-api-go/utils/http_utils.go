package http_utils

import (
	"encoding/json"
	"net/http"
)

func WriteJSONResponse(responseWriter http.ResponseWriter, httpStatus int, data interface{}) {
	res, _ := json.Marshal(data)
	responseWriter.Header().Set("Content-Type", "application/json")
	responseWriter.WriteHeader(httpStatus)
	responseWriter.Write(res)
}
