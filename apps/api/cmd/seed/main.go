package main

import (
	"ecommerce/config"
	"ecommerce/internal/category/domain"
	"ecommerce/internal/db"
	"encoding/csv"
	"fmt"
	"os"
	"strings"

	"gorm.io/gorm"
)

func main() {
	config.LoadEnv()
	dir, _ := os.Getwd()
	fmt.Println("Current working dir:", dir)
	db := db.GetDB()
	db.AutoMigrate(&domain.Category{})
	file, err := os.Open(dir + "/cmd/seed/data.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	rows, err := reader.ReadAll()
	if err != nil {
		panic(err)
	}

	for i, row := range rows {
		if i == 0 {
			continue
		}
		parentName := strings.TrimSpace(row[3])
		childName := strings.TrimSpace(row[4])

		// Insert parent if not exists
		parent, err := getOrCreateCategory(db, parentName, nil)
		if err != nil {
			fmt.Println("Error creating parent:", err)
			continue
		}

		// Insert child with ParentID
		_, err = getOrCreateCategory(db, childName, &parent.ID)
		if err != nil {
			fmt.Println("Error creating child:", err)
		}
	}

	fmt.Println("All categories inserted.")
}

func getOrCreateCategory(db *gorm.DB, name string, parentID *uint) (*domain.Category, error) {
	var category domain.Category
	// Check if already exists
	query := db.Where("name = ?", name)
	if parentID == nil {
		query = query.Where("parent_id IS NULL")
	} else {
		query = query.Where("parent_id = ?", parentID)
	}
	err := query.First(&category).Error
	if err == nil {
		return &category, nil
	}
	if err != gorm.ErrRecordNotFound {
		return nil, err
	}

	// Create new
	category = domain.Category{Name: name, ParentID: parentID}
	if err := db.Create(&category).Error; err != nil {
		return nil, err
	}
	return &category, nil
}
