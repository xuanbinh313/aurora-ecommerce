package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBHost   string
	DBUser   string
	DBPass   string
	DBName   string
	DBPort   string
	TimeZone string
}

// LoadConfig đọc cấu hình từ file .env
func LoadConfig() (*Config, error) {
	// err := godotenv.Load("../../.env") // only load in debug mode
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("failed to load .env file: %v", err)
	}

	config := &Config{
		DBHost:   os.Getenv("DB_HOST"),
		DBUser:   os.Getenv("DB_USER"),
		DBPass:   os.Getenv("DB_PASSWORD"),
		DBName:   os.Getenv("DB_NAME"),
		DBPort:   os.Getenv("DB_PORT"),
		TimeZone: os.Getenv("TIMEZONE"),
	}

	return config, nil
}
