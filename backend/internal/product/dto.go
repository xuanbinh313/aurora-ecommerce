package product

import (
	"encoding/json"
	"errors"
)

type CreateProductRequest struct {
	ID                            string             `json:"id" binding:"required"`
	IDType                        IDType             `json:"idType" binding:"required"`
	CategoryId                    string             `json:"categoryId" binding:"required"`
	Title                         string             `json:"title" binding:"required"`
	Brand                         string             `json:"brand" binding:"required"`
	Manufacturer                  string             `json:"manufacturer" binding:"required"`
	MFRPartNumber                 string             `json:"mfrPartNumber" binding:"required"`
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

type ProductResponse struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Brand     string  `json:"brand"`
	MainImage string  `json:"mainImage"`
	Price     float64 `json:"price"`
	Slug      string  `json:"slug"`
}

func (p *CreateProductRequest) BindShippingInfo() error {
	switch p.ShippingType {
	case "domestic":
		var d DomesticShippingInfo
		if err := json.Unmarshal(p.ShippingRaw, &d); err != nil {
			return err
		}
		p.ShippingInfo = d
	case "international":
		var i InternationalShippingInfo
		if err := json.Unmarshal(p.ShippingRaw, &i); err != nil {
			return err
		}
		p.ShippingInfo = i
	default:
		return errors.New("invalid shipping type")
	}
	return nil
}
