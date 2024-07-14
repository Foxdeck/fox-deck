package resources

import (
	"database/sql"
	"fmt"
	"fox-deck-api/database"
	"fox-deck-api/logging"
	"github.com/google/uuid"
	"time"
)

// ResourceFilter
// Can be used to filter a list of Resources
type ResourceFilter struct {
	ParentResourceId string
}

type ResourceRepositoryConnection struct {
	DbConnection *database.Connection
}

type ResourceRepository interface {
	GetResourceByUserId(userId string, filter ResourceFilter) (*[]database.Resource, error)
	SearchForNoteByName(userId string, name string) (*[]database.Resource, error)
}

func (repository *ResourceRepositoryConnection) SearchForNoteByName(userId string, name string) (*[]database.Resource, error) {
	logging.Debug("resource_repository", fmt.Sprintf("(SearchForNoteByName) => Search for a note with name like '%s'", name))
	retrievedResources := &[]database.Resource{}

	conn := repository.DbConnection.Connect()
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

func (repository *ResourceRepositoryConnection) CreateResourceForUser(userId string, request CreateResourceRequest) (*CreateResourceRequest, error) {
	logging.Debug("resource_repository", fmt.Sprintf("(CreateResourceForUser) => Create resource for user with id '%s'", userId))

	connection := repository.DbConnection.Connect()
	tx, err := connection.Begin()
	if err != nil {
		return nil, err
	}

	resourceId, err := repository.insertIntoResource(request, tx)
	if err != nil {
		tx.Rollback()
		logging.Error("resource_repository", fmt.Sprintf("Error while preparing statement: %o", err))
		return nil, err
	}

	err = repository.insertIntoUserResourceAssociation(resourceId, userId, tx)
	if err != nil {
		tx.Rollback()
		logging.Error("resource_repository", fmt.Sprintf("Error while preparing statement: %o", err))
		return nil, err
	}

	tx.Commit()
	return &request, nil
}

func (repository *ResourceRepositoryConnection) insertIntoResource(request CreateResourceRequest, tx *sql.Tx) (string, error) {
	query := `INSERT into Resource (
                  Resource.resourceId,
                  Resource.name,
                  Resource.type,
                  Resource.content,
                  Resource.createdAt,
                  Resource.parentResourceId)
		  VALUES (?, ?, ?, ?, ?, ?);`

	stmt, err := tx.Prepare(query)
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	resourceId := uuid.New().String()
	_, err = stmt.Exec(resourceId, request.Name, request.Type, request.Content, time.Now(), request.ParentResourceId)
	if err != nil {
		return "", err
	}

	return resourceId, nil
}

func (repository *ResourceRepositoryConnection) insertIntoUserResourceAssociation(resourceId string, userId string, tx *sql.Tx) error {
	query2 := `INSERT into UserResourceAssociation (
					 UserResourceAssociation.id,
					 UserResourceAssociation.resourceId,
					 UserResourceAssociation.userId)
		  VALUES (?, ?, ?);`

	stmt2, err := tx.Prepare(query2)
	if err != nil {
		return err
	}
	defer stmt2.Close()

	_, err = stmt2.Exec(uuid.New().String(), resourceId, userId)
	if err != nil {
		return err
	}

	return nil
}

// GetResourceByUserId
// Retrieves a resource from the database, based on the id of the user.
func (repository *ResourceRepositoryConnection) GetResourceByUserId(userId string, filter ...ResourceFilter) (*[]database.Resource, error) {
	logging.Debug("resource_repository", fmt.Sprintf("(GetResourceByUserId) => Get resource for user with id '%s'", userId))
	retrievedResources := &[]database.Resource{}

	conn := repository.DbConnection.Connect()
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

func filterResources(retrievedResources *[]database.Resource, filter []ResourceFilter) []database.Resource {
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
