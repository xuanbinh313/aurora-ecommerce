package upload

import (
	"ecommerce/internal/upload/application"
	"ecommerce/internal/upload/infra"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRouter(r *gin.RouterGroup, db *gorm.DB) {
	infra.MigrateUploadDB()
	repo := infra.NewUploadRepository(db)
	service := application.NewUpload(repo)
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
