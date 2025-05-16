// ecommerce/internal/db/db.go
package db

import (
	"ecommerce/config"
	"fmt"
	"log"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Singleton pattern
var (
	db   *gorm.DB
	once sync.Once
)

// GetDB trả về kết nối DB duy nhất (Singleton)
func GetDB() *gorm.DB {
	once.Do(func() {
		cfg, err := config.LoadConfig()
		if err != nil {
			log.Fatalf("Failed to load config: %v", err)
		}

		dsn := fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s",
			cfg.DBHost, cfg.DBUser, cfg.DBPass, cfg.DBName, cfg.DBPort, cfg.TimeZone,
		)

		fmt.Println("Connecting to database with DSN:", dsn)
		connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Fatalf("Failed to connect database: %v", err)
		}
		db = connection
	})

	return db
}
