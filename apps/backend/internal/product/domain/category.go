package domain

import "time"

type Category struct {
	ID        uint `gorm:"primaryKey"`
	Name      string
	ParentID  *uint      // nullable: category có thể không có cha
	Parent    *Category  `gorm:"foreignkey:ParentID"` // Self reference
	Children  []Category `gorm:"foreignkey:ParentID"` // Một cha có nhiều con
	CreatedAt time.Time
	UpdatedAt time.Time
}
