// ecommerce/internal/category/infra/migrate.go
package infra

import (
	"ecommerce/internal/category/domain"
	"ecommerce/internal/db"
	"log"
)

// MigrateCategoryDB thực hiện migration cho Category
func MigrateCategoryDB() {
	dbConn := db.GetDB()
	err := dbConn.AutoMigrate(&domain.Category{})
	if err != nil {
		log.Fatalf("Failed to migrate Category table: %v", err)
	}
}
