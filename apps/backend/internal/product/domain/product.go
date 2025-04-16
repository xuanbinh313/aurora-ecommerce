package domain

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name              string
	Slug              string `gorm:"unique"`
	Description       string
	CategoryID        string
	Category          Category
	ProductAttributes []ProductAttribute
	Variants          []Variant `gorm:"foreignKey:ProductID"`
	Images            []string
	Price             float64
	SalePrice         float64
	HasTax            bool
	Tax               float64
	BrandID           uint
	Brand             Brand
	Stock             int
	// ShippingType      string
	// ShippingRaw       json.RawMessage
	// ShippingInfo      ShippingInfo
}

type ProductAttribute struct {
	gorm.Model
	Name        string
	Description string
	CategoryID  string
}
