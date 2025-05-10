package dto

import (
	"ecommerce/internal/category/domain"
)

type CreateProductRequestDto struct {
	CategoryId        string                    `json:"categoryId" binding:"required"`
	Title             string                    `json:"title" binding:"required"`
	Brand             string                    `json:"brand" binding:"required"`
	Manufacturer      string                    `json:"manufacturer" binding:"required"`
	MFRPartNumber     string                    `json:"mfrPartNumber" binding:"required"`
	Name              string                    `json:"name" binding:"required"`
	Slug              string                    `json:"slug"`
	Description       string                    `json:"description"`
	Images            []string                  `json:"images" binding:"required,dive,required"`
	ProductAttributes []domain.ProductAttribute `json:"productAttributes"`
	Variants          []domain.Variant          `json:"variants"`
	Price             float64                   `json:"price" `
	SalePrice         float64                   `json:"salePrice" `
	HasTax            bool                      `json:"hasTax"`
	Tax               float64                   `json:"tax" `
	Stock             int                       `json:"stock" `
	// ShippingType                  string                    `json:"shippingType" binding:"required"`
	// ShippingRaw                   json.RawMessage           `json:"shipping" binding:"required"`
	// ShippingInfo                  domain.ShippingInfo       `json:"-"`
}

type ProductResponse struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Brand     string  `json:"brand"`
	MainImage string  `json:"mainImage"`
	Price     float64 `json:"price"`
	Slug      string  `json:"slug"`
}

func (p *CreateProductRequestDto) BindShippingInfo() error {
	// switch p.ShippingType {
	// case "domestic":
	// 	var d domain.DomesticShippingInfo
	// 	if err := json.Unmarshal(p.ShippingRaw, &d); err != nil {
	// 		return err
	// 	}
	// 	p.ShippingInfo = d
	// case "international":
	// 	var i domain.InternationalShippingInfo
	// 	if err := json.Unmarshal(p.ShippingRaw, &i); err != nil {
	// 		return err
	// 	}
	// 	p.ShippingInfo = i
	// default:
	// 	return errors.New("invalid shipping type")
	// }
	return nil
}
