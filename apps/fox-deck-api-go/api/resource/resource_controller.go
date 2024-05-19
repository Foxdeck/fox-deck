package resources

import (
	"fmt"
	"fox-deck-api/database"
	"fox-deck-api/exceptions"
	"fox-deck-api/logging"
	"fox-deck-api/repository"
	"fox-deck-api/repository/filter"
	"fox-deck-api/token"
	"fox-deck-api/utils/http"
	"net/http"
	"strings"
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
	authHeader := request.Header.Get("Authorization")
	if authHeader == "" {
		logging.Debug("resource_controller", fmt.Sprintf("(GetResource) => Authorization-Header not set: %s", request.Header))
		http_utils.WriteJSONResponse(responseWriter, http.StatusUnauthorized, &exceptions.AuthenticationError{})
		return
	}

	// authorization header looks like 'Bearer xyz', that's why we need to split it
	jwt := strings.Split(authHeader, " ")[1]
	tokenMap, err := token.GetTokenClaimsAsMap(jwt)
	userID, hasUserID := tokenMap["id"]
	if hasUserID == false {
		logging.Debug("resource_controller", fmt.Sprintf("(GetResource) => UserID is not coded in the JWT-Token; Decoded JWT-Parameters: %s", tokenMap))
		http_utils.WriteJSONResponse(responseWriter, http.StatusUnauthorized, &exceptions.AuthenticationError{})
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
