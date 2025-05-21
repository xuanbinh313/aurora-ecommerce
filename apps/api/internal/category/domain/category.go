package domain

import (
	"time"

	"gorm.io/gorm"
)

// Category represents a product category.
type Category struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Name        string         `json:"name" gorm:"not null"`
	Slug        string         `json:"slug" gorm:"uniqueIndex"`
	ParentID    *uint          `json:"parent_id"`
	Description string         `json:"description"`
	Display     string         `json:"display" gorm:"default:'default'"`
	ImageID     *uint          `json:"image_id"`
	Image       *Image         `json:"image" gorm:"foreignKey:ImageID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	MenuOrder   int            `json:"menu_order" gorm:"default:0"`
	Count       int            `json:"count" gorm:"->;default:0"` // Read-only
	Parent      *Category      `json:"parent" gorm:"foreignKey:ParentID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

// Image represents the image data of a category.
type Image struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Src       string         `json:"src"`
	Name      string         `json:"name"`
	Alt       string         `json:"alt,omitempty"`
	ProductID uint
}

// type Attribute struct {
// 	gorm.Model
// 	Name string // eg: "Color", "Size", "Storage"
// }

// type CategoryAttribute struct {
// 	ID          string
// 	CategoryID  string
// 	AttributeID string
// 	Attribute   Attribute `gorm:"foreignKey:AttributeID"`
// }

// type Variant struct {
// 	gorm.Model
// 	ProductID  string
// 	SKU        string
// 	Price      float64
// 	SalePrice  float64
// 	HasTax     bool
// 	Tax        float64
// 	Stock      int
// 	Image      string
// 	Attributes []VariantAttribute `gorm:"foreignKey:VariantID"`
// }

// type VariantAttribute struct {
// 	ID          string
// 	VariantID   string
// 	AttributeID string
// 	Attribute   Attribute `gorm:"foreignKey:AttributeID"`
// 	Value       string    // Eg: "Red", "128GB"
// }
