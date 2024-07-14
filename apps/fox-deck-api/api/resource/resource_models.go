package resources

type CreateResourceRequest struct {
	Name             string `json:"name"`
	Type             string `json:"type"` // TODO: can be 'folder', 'note', 'wastebasket', 'favorite'
	Content          string `json:"content"`
	ParentResourceId string `json:"parentResourceId"`
}

type CreateResourceResponse struct {
	Name             string `json:"name"`
	Type             string `json:"type"` // TODO: can be 'folder', 'note', 'wastebasket', 'favorite'
	Content          string `json:"content"`
	ParentResourceId string `json:"parentResourceId"`
	CreatedAt        string `json:"CreatedAt"`
}

// GetResourceRequest
// Represents the request for a resource GET-Request.
type GetResourceRequest struct {
	ParentResourceId string `json:"parentResourceId"`
}
