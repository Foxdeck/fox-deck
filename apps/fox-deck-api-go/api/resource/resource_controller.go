package resources

import (
	"fox-deck-api/database"
	"fox-deck-api/repository"
	"fox-deck-api/repository/filter"
	"fox-deck-api/utils"
	"net/http"
)

var resourceRepositoryConn = &repository.ResourceRepositoryConnection{
	DbConnection: database.GetInstance(),
}

func CreateResource(responseWriter http.ResponseWriter, request *http.Request) {
}

// GetResource
// Retrieve a resource for a user.
// TODO: Implement Authentication; the userId comes from the JWT Token
func GetResource(responseWriter http.ResponseWriter, request *http.Request) {
	userID := "d1c2fdf0-2025-4d7f-a87e-143744ed5b9c"

	// decode query parameters
	queryParams := request.URL.Query()
	parentResourceId := queryParams.Get("parentResourceId")

	// get the resources for the authenticated user based on the filter
	resources, err := resourceRepositoryConn.GetResourceByUserId(userID, filter.ResourceFilter{
		ParentResourceId: parentResourceId,
	})

	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusInternalServerError)
	}

	if resources == nil {
		http.Error(responseWriter, "Resource not found", http.StatusNotFound)
		return
	}

	http_utils.WriteJSONResponse(responseWriter, http.StatusOK, resources)
}
