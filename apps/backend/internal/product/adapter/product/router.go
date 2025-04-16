package product

import (
	"ecommerce/internal/product/application"
	"ecommerce/internal/product/infra"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.RouterGroup) {
	db := infra.ConnectDB()
	repo := infra.NewMemoryRepository(db)
	service := application.NewService(repo)
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
