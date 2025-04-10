package main

import (
	"time"

	"log"

	"github.com/golang-jwt/jwt/v5"

	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

type User struct {
	gorm.Model
	UserName string `gorm:"unique"`
	Password string
	Role     string
}

var DB *gorm.DB

func ConnectDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB.AutoMigrate(&User{})
}

var SECRET_KEY = []byte("my-secret-key")

// Tạo token JWT
func GenerateJWT(username, role string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"role":     role,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Hết hạn sau 24h
	})

	return token.SignedString(SECRET_KEY)
}
