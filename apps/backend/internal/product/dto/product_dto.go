package dto

import (
	"ecommerce/internal/category/domain"
)

type CreateProductRequestDto struct {
	Name             string         `json:"name" binding:"required"`
	Slug             string         `json:"slug"`
	Description      string         `json:"description"`
	ShortDescription string         `json:"shortDescription"`
	Images           []domain.Image `json:"images" binding:"required,dive,required"`
	RegularPrice     float64        `json:"regularPrice"`
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
