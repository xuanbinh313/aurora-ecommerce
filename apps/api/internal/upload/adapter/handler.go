package upload

import (
	"ecommerce/internal/upload/application"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type IDUri struct {
	ID string `uri:"id" binding:"required"`
}

type Handler struct {
	service application.UploadService
}

func (h *Handler) GetPresignedURL(c *gin.Context) {
	var req struct {
		FileNames []string `json:"file_names"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	expires := time.Now().Add(5 * time.Minute).Unix()
	urls := make([]string, 0, len(req.FileNames))
	for _, name := range req.FileNames {
		signature := h.service.GenerateUploadSignature(c.Request.Context(), name, expires)
		url := fmt.Sprintf("http://localhost:8080/api/uploads/presigned-url?file=%s&expires=%d&sig=%s", name, expires, signature)
		urls = append(urls, url)
	}
	c.JSON(http.StatusOK, gin.H{"urls": urls})
}

func (h *Handler) UploadByPresignedURL(c *gin.Context) {
	file := c.Query("file")
	expireStr := c.Query("expires")
	sig := c.Query("sig")
	expires, err := strconv.ParseInt(expireStr, 10, 64)

	if err != nil || time.Now().Unix() > expires {
		c.String(http.StatusForbidden, "URL expired")
		return
	}

	expectedSig := h.service.GenerateUploadSignature(c.Request.Context(), file, expires)
	if sig != expectedSig {
		c.String(http.StatusForbidden, "invalid signature")
		return
	}
	tmpPath := "./tmp/" + file
	if err := os.MkdirAll("./tmp", os.ModePerm); err != nil {
		c.String(http.StatusInternalServerError, "server error")
		return
	}
	out, err := os.Create(tmpPath)
	if err != nil {
		c.String(http.StatusBadRequest, "Cannot create file")
		return
	}

	defer out.Close()

	_, err = io.Copy(out, c.Request.Body)
	if err != nil {
		c.String(http.StatusBadRequest, "Upload failed")
		return
	}
	image, err := h.service.Upload(c.Request.Context(), tmpPath)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	fmt.Println("MEDIA CHECK", image)
	c.JSON(http.StatusOK, gin.H{"url": image})
}

func NewHandler(service application.UploadService) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRouter(r *gin.RouterGroup) {
	uploadGroup := r.Group("/uploads")
	{
		uploadGroup.POST("/presigned-url", h.GetPresignedURL)
		uploadGroup.PUT("/presigned-url", h.UploadByPresignedURL)
	}
}
