package upload

import (
	"ecommerce/internal/upload/application"
	"fmt"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
)

type IDUri struct {
	ID string `uri:"id" binding:"required"`
}

type Handler struct {
	service application.UploadService
}

func (h *Handler) UploadMediaFile(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		fmt.Println("Form parse error:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid multipart form"})
		return
	}

	if form == nil || len(form.File) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files in form data"})
		return
	}

	fmt.Printf("DEBUG form.File keys: %v\n", reflect.ValueOf(form.File).MapKeys())
	fmt.Println(form)
	files := form.File["files"]
	medias, err := h.service.Upload(c.Request.Context(), files)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Files uploaded successfully", "data": medias})
}

func NewHandler(service application.UploadService) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRouter(r *gin.RouterGroup) {
	uploadGroup := r.Group("/uploads")
	{
		uploadGroup.POST("/", h.UploadMediaFile)
	}
}
