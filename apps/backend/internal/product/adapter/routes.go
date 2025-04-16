package adapter

import (
	"ecommerce/internal/product/adapter/product"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.Engine) {
	api := r.Group("/api")
	product.RegisterRouter(api)
}
