package domain

import "gorm.io/gorm"

// Media represents the file entry in the database
type Media struct {
	gorm.Model
	ID        uint   `json:"id" gorm:"primaryKey"`
	Src       string `json:"src" gorm:"size:500"`
	MediaType string `json:"media_type" gorm:"size:50"`
	Name      string `json:"name"`
	Alt       string `json:"alt"`
}
