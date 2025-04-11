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

type Variant struct {
	ID                            string             `json:"id" binding:"required"`
	SKU                           string             `json:"sku" binding:"required"`
	Price                         float64            `json:"price" binding:"required,gt=0"`
	HasTax                        bool               `json:"hasTax" binding:"default=false"`
	SalePrice                     float64            `json:"salePrice" binding:"required,gt=0"`
	Tax                           float64            `json:"tax" binding:"required,gt=0"`
	Stock                         int                `json:"stock" binding:"required,gte=0"`
	Image                         string             `json:"image"` // optional
	Attributes                    []VariantAttribute `json:"attributes"`
	TrackQuantity                 bool               `json:"trackQuantity"`
	ContinueSellingWhenOutOfStock bool               `json:"continueSellingWhenOutOfStock"`
}

type VariantAttribute struct {
	ID    string `json:"id" binding:"required"`
	Name  string `json:"name" binding:"required"`  // e.g. Size, Color
	Value string `json:"value" binding:"required"` // e.g. L, Red
}

type Tag struct {
	ID   string `json:"id" binding:"required"`
	Name string `json:"name" binding:"required"`
}
type ShippingInfo interface {
	GetWeight() float64
	GetType() string
}
type DomesticShippingInfo struct {
	Weight float64 `json:"weight"`
}

func (d DomesticShippingInfo) GetWeight() float64 {
	return d.Weight
}

func (d DomesticShippingInfo) GetType() string {
	return "domestic"
}

type InternationalShippingInfo struct {
	Weight          float64 `json:"weight"`
	CountryOfOrigin string  `json:"countryOfOrigin"`
	HSCode          string  `json:"hsCode"`
}

func (i InternationalShippingInfo) GetWeight() float64 {
	return i.Weight
}

func (i InternationalShippingInfo) GetType() string {
	return "international"
}
