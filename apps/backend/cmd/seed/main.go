package main

import (
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/infra"
	"encoding/csv"
	"fmt"
	"os"
	"strings"

	"gorm.io/gorm"
)

func main() {
	db := infra.ConnectDB()
	file, err := os.Open("data.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	rows, err := reader.ReadAll()
	if err != nil {
		panic(err)
	}

	for _, row := range rows {
		if len(row) < 2 {
			continue
		}
		parentName := strings.TrimSpace(row[0])
		childName := strings.TrimSpace(row[1])

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
	err := db.Where("name = ? AND parent_id = ?", name, parentID).First(&category).Error
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
