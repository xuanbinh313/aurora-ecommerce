package dto

import (
	"ecommerce/internal/common/utils"
	domainUpload "ecommerce/internal/upload/domain"
)

type CreateProductRequestDto struct {
	Name             string               `json:"name" binding:"required"`
	Slug             *string              `json:"slug"`
	Description      *string              `json:"description"`
	ShortDescription *string              `json:"short_description"`
	Images           []domainUpload.Media `json:"images"`
	Thumbnail        *domainUpload.Media  `json:"thumbnail"`
	RegularPrice     utils.Float64Custom  `json:"regular_price"`
	SalePrice        utils.Float64Custom  `json:"sale_price"`
	Categories       *[]string            `json:"categories"`
	Visibility       *string              `json:"visibility"`
	Status           *string              `json:"status"`
}

type UpdateProductRequestDto struct {
	Name             string              `json:"name" binding:"required"`
	Slug             string              `json:"slug" binding:"required"`
	Description      *string             `json:"description"`
	ShortDescription *string             `json:"short_description"`
	ImageIDs         []string            `json:"image_ids"`
	ThumbnailID      *string             `json:"thumbnail_id,omitempty"`
	RegularPrice     utils.Float64Custom `json:"regular_price"`
	SalePrice        utils.Float64Custom `json:"sale_price"`
	Categories       *[]string           `json:"categories"`
	Visibility       string              `json:"visibility"`
	Status           string              `json:"status"`
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
