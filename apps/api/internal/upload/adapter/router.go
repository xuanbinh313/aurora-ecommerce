package upload

import (
	"ecommerce/internal/upload/application"

	"github.com/gin-gonic/gin"
)

func RegisterRouter(r *gin.RouterGroup, service application.UploadService) {
	handler := NewHandler(service)
	handler.RegisterRouter(r)
}
