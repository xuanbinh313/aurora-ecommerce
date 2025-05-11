package domain

import (
	"ecommerce/internal/category/domain"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name             string
	Type             string
	Slug             string `gorm:"unique"`
	ShortDescription string
	Description      string
	Status           string
	CategoryID       string
	Category         domain.Category
	Images           []domain.Image
	RegularPrice     float64
	Links            LinkProduct
}

type Link struct {
	Href string
}

type LinkProduct struct {
	Self       []Link
	Collection []Link
}
