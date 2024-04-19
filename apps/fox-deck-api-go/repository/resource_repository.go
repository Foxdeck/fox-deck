package repository

import (
	"fmt"
	"fox-deck-api/database"
	"fox-deck-api/logging"
	"fox-deck-api/repository/filter"
	"zombiezen.com/go/sqlite"
	"zombiezen.com/go/sqlite/sqlitex"
)

type ResourceRepositoryConnection struct {
	DbConnection *database.Connection
}

type ResourceRepository interface {
	GetResourceByUserId(userId string, filter filter.ResourceFilter) (*[]database.Resource, error)
}

// GetResourceByUserId
// Retrieves a resource from the database, based on the id of the user.
func (resourceRepositoryConnection *ResourceRepositoryConnection) GetResourceByUserId(userId string, filter ...filter.ResourceFilter) (*[]database.Resource, error) {
	retrievedResources := &[]database.Resource{}

	selectOptions := &sqlitex.ExecOptions{
		ResultFunc: func(stmt *sqlite.Stmt) error {
			resource := &database.Resource{
				Id:               stmt.ColumnText(0),
				ParentResourceId: stmt.ColumnText(1),
				Type:             stmt.ColumnText(2),
				Name:             stmt.ColumnText(3),
				Content:          stmt.ColumnText(4),
				CreatedAt:        stmt.ColumnText(5),
			}
			*retrievedResources = append(*retrievedResources, *resource)

			return nil
		},
		Args: []interface{}{
			userId,
		},
	}

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

	err := sqlitex.Execute(conn, query, selectOptions)
	if err != nil {
		return nil, err
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
