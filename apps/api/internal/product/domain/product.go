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
	ShortDescription string `json:"short_description"`
	Description      string
	Status           string
	CategoryID       string
	Category         domain.Category
	Images           []domain.Image `gorm:"many2many:product_images;"`
	RegularPrice     float64        `json:"regular_price"`
}

type Link struct {
	Href string
}

type LinkProduct struct {
	Self       []Link
	Collection []Link
}
