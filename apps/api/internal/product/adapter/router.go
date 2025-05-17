package product

import (
	"ecommerce/internal/product/application"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.RouterGroup, service application.ProductService) {
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
