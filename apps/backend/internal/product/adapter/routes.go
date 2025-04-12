package adapter

import (
	"ecommerce/internal/product/application"
	"ecommerce/internal/product/infra"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.Engine) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Ho_Chi_Minh",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	db := infra.InitDB(dsn)
	productRepo := infra.NewMemoryRepository(db)
	productService := application.NewService(productRepo)
	productHandler := NewHandler(productService)
	productHandler.RegisterRouter(r)
}
