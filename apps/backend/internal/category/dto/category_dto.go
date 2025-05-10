package dto

type CreateCategoryDto struct {
	Name        string  `json:"name" binding:"required,min=3"`
	Slug        *string `json:"slug,omitempty"`
	Description *string `json:"description,omitempty"`
}

type UpdateCategoryDto struct {
	Name        *string `json:"name,omitempty" binding:"min=3"`
	Slug        *string `json:"slug,omitempty"`
	Description *string `json:"description,omitempty"`
}
