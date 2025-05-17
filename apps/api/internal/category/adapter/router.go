package category

import (
	"ecommerce/internal/category/application"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.RouterGroup, service application.CategoryService) {
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
