package infra

import (
	"ecommerce/internal/db"
	"ecommerce/internal/upload/domain"
	"log"
)

func MigrateUploadDB() {
	dbConn := db.GetDB()
	err := dbConn.AutoMigrate(&domain.Media{})
	if err != nil {
		log.Fatalf("Failed to migrate Product table: %v", err)
	}
}
