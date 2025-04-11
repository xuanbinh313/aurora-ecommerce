package adapter

import (
	"ecommerce/internal/product/application"
	"ecommerce/internal/product/infra"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.Engine) {
	productRepo := infra.NewMemoryRepository()
	productService := application.NewService(productRepo)
	productHandler := NewHandler(productService)
	productHandler.RegisterRouter(r)
}
