package category

import (
	"ecommerce/internal/category/application"
	"ecommerce/internal/category/infra"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRouter(r *gin.RouterGroup, db *gorm.DB) {
	infra.MigrateCategoryDB()
	repo := infra.NewCategoryRepository(db)
	service := application.NewService(repo)
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
