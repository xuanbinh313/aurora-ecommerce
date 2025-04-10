package routes

import (
	"ecommerce/internal/product"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.Engine) {
	productRepo := product.NewMemoryRepository()
	productService := product.NewService(productRepo)
	productHandler := product.NewHandler(productService)
	productHandler.RegisterRouter(r)
}
