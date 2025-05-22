package domain

import (
	"time"

	"gorm.io/gorm"
)

// Media represents the file entry in the database
type Media struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
	Src       string         `json:"src" gorm:"size:500"`
	MediaType string         `json:"media_type" gorm:"size:50"`
	Name      string         `json:"name"`
	Alt       string         `json:"alt,omitempty"`
}
