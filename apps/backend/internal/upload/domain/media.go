package domain

import "gorm.io/gorm"

// Media represents the file entry in the database
type Media struct {
	gorm.Model
	ID        uint   `gorm:"primaryKey"`
	Src       string `gorm:"size:500"`
	MediaType string `gorm:"size:50"`
	Name      string
	Alt       string
}
