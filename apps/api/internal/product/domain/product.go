package domain

import (
	domainCategory "ecommerce/internal/category/domain"
	domainUpload "ecommerce/internal/upload/domain"
	"time"

	"gorm.io/gorm"
)

type Product struct {
	ID               uint                      `json:"id" gorm:"primaryKey"`
	CreatedAt        time.Time                 `json:"created_at"`
	UpdatedAt        time.Time                 `json:"updated_at"`
	DeletedAt        gorm.DeletedAt            `json:"deleted_at" gorm:"index"`
	Name             string                    `json:"name"`
	Type             *string                   `json:"type"`
	Slug             string                    `json:"slug" gorm:"uniqueIndex"`
	ShortDescription *string                   `json:"short_description"`
	Description      *string                   `json:"description"`
	Categories       []domainCategory.Category `json:"categories" gorm:"many2many:product_categories;constraint:OnDelete:CASCADE;"`
	Images           []domainUpload.Media      `json:"images" gorm:"many2many:product_images;"`
	RegularPrice     *float64                  `json:"regular_price"`
	SalePrice        *float64                  `json:"sale_price"`
	Status           string                    `json:"status"`
	Visibility       string                    `json:"visibility"`
	ThumbnailID      *uint                     `json:"thumbnail_id"`
	Thumbnail        *domainUpload.Media       `json:"thumbnail" gorm:"foreignKey:ThumbnailID"`
}

type Link struct {
	Href string
}

type LinkProduct struct {
	Self       []Link
	Collection []Link
}
