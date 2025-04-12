package domain

import (
	"encoding/json"
)

type IDType string

type Measure string

const (
	IDTypeUPC  IDType  = "UPC"
	IDTypeEAN  IDType  = "EAN"
	IDTypeGCID IDType  = "GCID"
	IDInches   Measure = "inches"
	IDFeet     Measure = "feet"
	IDMeters   Measure = "meters"
)

type Unit struct {
	UnitType Measure `json:"unitType" binding:"required"`
	Value    float64 `json:"value" binding:"required,gt=0"`
}

type ProductBase struct {
	ID            string `json:"id" binding:"required"`
	IDType        IDType `json:"idType" binding:"required"`
	CategoryId    string `json:"categoryId" binding:"required"`
	Title         string `json:"title" binding:"required"`
	Brand         string `json:"brand" binding:"required"`
	Manufacturer  string `json:"manufacturer" binding:"required"`
	MFRPartNumber string `json:"mfrPartNumber" binding:"required"`
}

type Product struct {
	ProductBase
	ID                            string             `json:"id" binding:"required"`
	Name                          string             `json:"name" binding:"required"`
	Slug                          string             `json:"slug"`
	Description                   string             `json:"description"`
	Images                        []string           `json:"images" binding:"required,dive,required"`
	Width                         Unit               `json:"width" binding:"required"`
	Height                        Unit               `json:"height" binding:"required"`
	Length                        Unit               `json:"length" binding:"required"`
	ProductAttributes             []ProductAttribute `json:"productAttributes"`
	Variants                      []Variant          `json:"variants"`
	Tags                          []Tag              `json:"tags"`
	Price                         float64            `json:"price" `
	SalePrice                     float64            `json:"salePrice" `
	HasTax                        bool               `json:"hasTax" binding:"default=false"`
	Tax                           float64            `json:"tax" `
	Stock                         int                `json:"stock" `
	TrackQuantity                 bool               `json:"trackQuantity"`
	ContinueSellingWhenOutOfStock bool               `json:"continueSellingWhenOutOfStock"`
	ShippingType                  string             `json:"shippingType" binding:"required"`
	ShippingRaw                   json.RawMessage    `json:"shipping" binding:"required"`
	ShippingInfo                  ShippingInfo       `json:"-"`
}

type ProductAttribute struct {
	ID          string `json:"id" binding:"required"`
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
}

type Tag struct {
	ID   string `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}
