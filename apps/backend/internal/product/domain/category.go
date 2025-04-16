package domain

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Name       string
	ParentID   *uint               // nullable: category có thể không có cha
	Parent     *Category           `gorm:"foreignkey:ParentID"` // Self reference
	Children   []Category          `gorm:"foreignkey:ParentID"` // Một cha có nhiều con
	Attributes []CategoryAttribute `gorm:"foreignKey:CategoryID"`
}

type Attribute struct {
	gorm.Model
	Name string // eg: "Color", "Size", "Storage"
}

type CategoryAttribute struct {
	ID          string
	CategoryID  string
	AttributeID string
	Attribute   Attribute `gorm:"foreignKey:AttributeID"`
}

type Variant struct {
	gorm.Model
	ProductID  string
	SKU        string
	Price      float64
	SalePrice  float64
	HasTax     bool
	Tax        float64
	Stock      int
	Image      string
	Attributes []VariantAttribute `gorm:"foreignKey:VariantID"`
}

type VariantAttribute struct {
	ID          string
	VariantID   string
	AttributeID string
	Attribute   Attribute `gorm:"foreignKey:AttributeID"`
	Value       string    // Eg: "Red", "128GB"
}
