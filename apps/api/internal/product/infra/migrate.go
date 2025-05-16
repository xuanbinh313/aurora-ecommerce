// ecommerce/internal/product/infra/migrate.go
package infra

import (
	"ecommerce/internal/db"
	"ecommerce/internal/product/domain"
	"log"
)

// MigrateProductDB thực hiện migration cho Product
func MigrateProductDB() {
	dbConn := db.GetDB()
	err := dbConn.AutoMigrate(&domain.Product{})
	if err != nil {
		log.Fatalf("Failed to migrate Product table: %v", err)
	}
}
