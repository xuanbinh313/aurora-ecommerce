package product

import (
	"ecommerce/internal/product/application"
	"ecommerce/internal/product/infra"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRouter(r *gin.RouterGroup, db *gorm.DB) {
	infra.MigrateProductDB()
	repo := infra.NewProductRepository(db)
	service := application.NewService(repo)
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
