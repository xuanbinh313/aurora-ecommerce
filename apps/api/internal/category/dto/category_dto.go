package dto

type CreateCategoryDto struct {
	Name        string  `json:"name" binding:"required,min=3"`
	Slug        *string `json:"slug,omitempty"`
	Description *string `json:"description,omitempty"`
	ParentID    *uint   `json:"parent_id,string,omitempty"`
}

type UpdateCategoryDto struct {
	ID          string  `json:"id"`
	Name        string  `json:"name" binding:"required,min=3"`
	Slug        string  `json:"slug"`
	Description *string `json:"description,omitempty"`
	ParentID    string  `json:"parent_id,omitempty"`
}
