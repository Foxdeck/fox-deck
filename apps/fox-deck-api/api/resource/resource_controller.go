package resources

import (
	"encoding/json"
	"fmt"
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
	"fox-deck-api/logging"
	"fox-deck-api/utils/http"
	"net/http"
)

var resourceRepositoryConn = &ResourceRepositoryConnection{
	DbConnection: database.GetInstance(),
}

// CreateResource
// @Summary     Creates a new resource for the logged-in user
// @Security 	Bearer
// @Tags        auth
// @Produce     json
// @Param       request		body	  resources.CreateResourceRequest  	true  "Query Parameter"
// @Success     200  		{object}  resources.CreateResourceResponse
// @Router		/resource [post]
func CreateResource(responseWriter http.ResponseWriter, request *http.Request) {
	logging.Debug("resource_controller", fmt.Sprintf("(CreateResource) => Create resource for a user"))
	userId, err := http_utils.ValidateAndExtractUserId(request)
	if err != nil {
		logging.Error("resource_controller", fmt.Sprintf("(GetResource) => Error validating and extracting user id: %s", err))
		http_utils.WriteJSONResponse(responseWriter, http.StatusUnauthorized, &exceptions.AuthenticationError{})
		return
	}

	resourceRequest := CreateResourceRequest{}
	err = json.NewDecoder(request.Body).Decode(&resourceRequest)
	if err != nil {
		http_utils.WriteJSONResponse(responseWriter, http.StatusBadRequest, &exceptions.UnexpectedError{})
		return
	}

	createdResource, err := resourceRepositoryConn.CreateResourceForUser(userId, resourceRequest)
	if err != nil {
		switch {
		default:
			// if some error we don't expect is thrown, we will only send an "Unexpected error"
			http_utils.WriteJSONResponse(responseWriter, http.StatusInternalServerError, &exceptions.UnexpectedError{})
			return
		}
	}

	http_utils.WriteJSONResponse(responseWriter, http.StatusOK, createdResource)
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
	resources, err := resourceRepositoryConn.GetResourceByUserId(userID, ResourceFilter{
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
