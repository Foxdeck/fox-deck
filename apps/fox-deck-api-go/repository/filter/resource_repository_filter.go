package filter

// ParentResourceIdEmpty
// Represents a Resource with an empty ParentResourceId
const ParentResourceIdEmpty = ""

// ResourceFilter
// Can be used to filter a list of Resources
type ResourceFilter struct {
	ParentResourceId string
}
