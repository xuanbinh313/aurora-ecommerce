package domain

import (
	"ecommerce/internal/upload/domain"
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
	Parent      *Category      `json:"parent" gorm:"foreignKey:ParentID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Description string         `json:"description"`
	Display     string         `json:"display" gorm:"default:'default'"`
	ImageID     *uint          `json:"image_id"`
	Image       *domain.Media  `json:"image" gorm:"foreignKey:ImageID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	MenuOrder   int            `json:"menu_order" gorm:"default:0"`
	Count       int            `json:"count" gorm:"->;default:0"`
}
