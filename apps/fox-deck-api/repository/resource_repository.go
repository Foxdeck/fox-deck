package repository

import (
	"fmt"
	"fox-deck-api/database"
	"fox-deck-api/logging"
	"fox-deck-api/repository/filter"
)

type ResourceRepositoryConnection struct {
	DbConnection *database.Connection
}

type ResourceRepository interface {
	GetResourceByUserId(userId string, filter filter.ResourceFilter) (*[]database.Resource, error)
	SearchForNoteByName(userId string, name string) (*[]database.Resource, error)
}

func (resourceRepositoryConnection *ResourceRepositoryConnection) SearchForNoteByName(userId string, name string) (*[]database.Resource, error) {
	logging.Debug("resource_repository", fmt.Sprintf("(SearchForNoteByName) => Search for a note with name like '%s'", name))
	retrievedResources := &[]database.Resource{}

	conn := resourceRepositoryConnection.DbConnection.Connect()
	query := `SELECT
		Resource.resourceId,
		Resource.parentResourceId,
		Resource.type,
		Resource.name,
		Resource.content,
		Resource.createdAt
	FROM
		Resource
	INNER JOIN
		UserResourceAssociation ON UserResourceAssociation.resourceId = Resource.resourceId
	INNER JOIN
		User ON User.id = UserResourceAssociation.userId
	WHERE
		User.id = ?
	AND
	    Resource.type = 'note'
	AND
	    SOUNDEX(?) = SOUNDEX(Resource.name)
		OR Resource.name LIKE CONCAT('%', ?, '%');`

	stmt, err := conn.Prepare(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Query(userId, name, name)
	if result.Err() != nil || err != nil {
		return nil, result.Err()
	}

	for result.Next() {
		resource := &database.Resource{}

		err := result.Scan(&resource.Id, &resource.ParentResourceId, &resource.Type, &resource.Name, &resource.Content, &resource.CreatedAt)
		if err != nil {
			return nil, err
		}
		*retrievedResources = append(*retrievedResources, *resource)
	}

	logging.Debug("resource_repository", fmt.Sprintf("'%d' resources found", len(*retrievedResources)))

	return retrievedResources, nil
}

// GetResourceByUserId
// Retrieves a resource from the database, based on the id of the user.
func (resourceRepositoryConnection *ResourceRepositoryConnection) GetResourceByUserId(userId string, filter ...filter.ResourceFilter) (*[]database.Resource, error) {
	logging.Debug("resource_repository", fmt.Sprintf("(GetResourceByUserId) => Get resource for user with id '%s'", userId))
	retrievedResources := &[]database.Resource{}

	conn := resourceRepositoryConnection.DbConnection.Connect()
	query := `SELECT
		Resource.resourceId,
		Resource.parentResourceId,
		Resource.type,
		Resource.name,
		Resource.content,
		Resource.createdAt
	FROM
		Resource
	INNER JOIN
		UserResourceAssociation ON UserResourceAssociation.resourceId = Resource.resourceId
	INNER JOIN
		User ON User.id = UserResourceAssociation.userId
	WHERE
		User.id = ?;`

	stmt, err := conn.Prepare(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Query(userId)
	if result.Err() != nil || err != nil {
		return nil, result.Err()
	}

	for result.Next() {
		resource := &database.Resource{}

		err := result.Scan(&resource.Id, &resource.ParentResourceId, &resource.Type, &resource.Name, &resource.Content, &resource.CreatedAt)
		if err != nil {
			return nil, err
		}
		*retrievedResources = append(*retrievedResources, *resource)
	}

	filteredResources := filterResources(retrievedResources, filter)

	logging.Debug("resource_repository", fmt.Sprintf("'%d' resources found", len(*retrievedResources)))

	return &filteredResources, nil
}

func filterResources(retrievedResources *[]database.Resource, filter []filter.ResourceFilter) []database.Resource {
	filteredResources := make([]database.Resource, 0)

	// if no filter is set
	if len(filter) == 0 {
		return *retrievedResources
	}

	// if filter is set
	for _, resource := range *retrievedResources {
		if resource.ParentResourceId == filter[0].ParentResourceId {
			filteredResources = append(filteredResources, resource)
		}
	}

	return filteredResources
}
