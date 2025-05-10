package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println(".env file not found. Using system env.")
	}
}

func GetEnv(key string, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

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
	err := godotenv.Load(".env")
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
