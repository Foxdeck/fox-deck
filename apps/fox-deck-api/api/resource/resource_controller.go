package resources

import (
	"fmt"
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
	"fox-deck-api/logging"
	"fox-deck-api/repository"
	"fox-deck-api/repository/filter"
	"fox-deck-api/utils/http"
	"net/http"
)

var resourceRepositoryConn = &repository.ResourceRepositoryConnection{
	DbConnection: database.GetInstance(),
}

func CreateResource(responseWriter http.ResponseWriter, request *http.Request) {
}

// GetResource
// @Summary     Retrieve resources for a user.
// @Tags        resources
// @Produce     json
// @Param       parentResourceId	path	string  false  "ParentResourceId"
// @Success     200  {object}  []database.Resource
// @Router		/resource [get]
func GetResource(responseWriter http.ResponseWriter, request *http.Request) {
	logging.Debug("resource_controller", fmt.Sprintf("(GetResource) => Retrieve resources for a user"))
	userID, err := http_utils.ValidateAndExtractUserId(request)
	if err != nil {
		logging.Error("resource_controller", fmt.Sprintf("(GetResource) => Error validating and extracting user id: %s", err))
		http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.AuthenticationError{})
		return
	}

	// decode query parameters
	queryParams := request.URL.Query()
	parentResourceId := queryParams.Get("parentResourceId")

	// get the resources for the authenticated user based on the filter
	resources, err := resourceRepositoryConn.GetResourceByUserId(userID, filter.ResourceFilter{
		ParentResourceId: parentResourceId,
	})

	if err != nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.UnexpectedError{})
	}

	if resources == nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusNotFound, &exceptions.ResourceNotFoundError{})
		return
	}

	http_utils.WriteJSONResponse(responseWriter, http.StatusOK, resources)
}

// SearchNoteByName
// @Summary     Search for a specific note by its name.
// @Tags        resources
// @Produce     json
// @Param       name	query	string  false  "name"
// @Success     200  {object}  []database.Resource
// @Router		/resource/search [get]
func SearchNoteByName(responseWriter http.ResponseWriter, request *http.Request) {
	logging.Debug("resource_controller", fmt.Sprintf("(SearchNoteByName) => Search for a specific note by its name."))
	userID, err := http_utils.ValidateAndExtractUserId(request)
	if err != nil {
		logging.Error("resource_controller", fmt.Sprintf("(SearchNoteByName) => Error validating and extracting user id: %s", err))
		http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.AuthenticationError{})
		return
	}

	// decode query parameters
	queryParams := request.URL.Query()
	name := queryParams.Get("name")

	// get the resources for the authenticated user based on the filter
	resources, err := resourceRepositoryConn.SearchForNoteByName(userID, name)

	if err != nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.UnexpectedError{})
	}

	if resources == nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusNotFound, &exceptions.ResourceNotFoundError{})
		return
	}

	http_utils.WriteJSONResponse(responseWriter, http.StatusOK, resources)
}
