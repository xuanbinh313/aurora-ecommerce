package application

import (
	"bytes"
	"context"
	"ecommerce/internal/upload/domain"
	"ecommerce/internal/upload/infra"
	"fmt"
	"image"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/kolesa-team/go-webp/webp"
	"github.com/nfnt/resize"
)

type UploadService interface {
	Upload(ctx context.Context, files []*multipart.FileHeader) ([]domain.Media, error)
}

type uploadService struct {
	repo *infra.UploadRepository
}

// Upload implements Service.
func (s *uploadService) Upload(ctx context.Context, files []*multipart.FileHeader) ([]domain.Media, error) {
	var medias []domain.Media

	for _, file := range files {
		fileMetadata, err := s.processAndSaveFile(file)
		if err != nil {
			return nil, err
		}
		medias = append(medias, *fileMetadata)
	}

	// Lưu tất cả metadata vào database cùng lúc
	err := s.repo.CreateMany(medias)
	if err != nil {
		return nil, err
	}

	return medias, nil
}

func NewUpload(repo *infra.UploadRepository) UploadService {
	return &uploadService{repo: repo}
}

// processAndSaveFile xử lý file và trả về metadata
func (s *uploadService) processAndSaveFile(file *multipart.FileHeader) (*domain.Media, error) {
	src, err := file.Open()
	if err != nil {
		return nil, err
	}
	defer src.Close()

	// Decode hình ảnh
	img, _, err := image.Decode(src)
	if err != nil {
		return nil, fmt.Errorf("Invalid image format: %v", err)
	}

	// Define sizes
	sizes := map[string][2]int{
		"thumbnail": {150, 150},
		"medium":    {300, 300},
		"large":     {1024, 1024},
		"original":  {0, 0},
	}

	// Generate unique filename (UUID)
	uniqueID := uuid.New().String()
	dir := fmt.Sprintf("uploads/%s/%s/", time.Now().Format("2006"), time.Now().Format("01"))
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		return nil, err
	}

	var savedFiles []string

	// Save images for each size
	for sizeName, size := range sizes {
		// Resize image (skip resize for "original")
		var resizedImg image.Image
		if size[0] > 0 && size[1] > 0 {
			resizedImg = resize.Resize(uint(size[0]), uint(size[1]), img, resize.Lanczos3)
		} else {
			resizedImg = img
		}

		// Generate filename
		fileName := fmt.Sprintf("%s_%s.webp", uniqueID, sizeName)
		filePath := filepath.Join(dir, fileName)

		// Save WebP file
		err := saveWebPImage(filePath, resizedImg)
		if err != nil {
			return nil, err
		}
		savedFiles = append(savedFiles, filePath)
	}

	// Create metadata
	fileMetadata := &domain.Media{
		Name:      uniqueID,
		Src:       dir,
		MediaType: "image/webp",
	}

	return fileMetadata, nil
}

// saveWebPImage saves an image as a WebP file
func saveWebPImage(filePath string, img image.Image) error {
	buffer := new(bytes.Buffer)
	err := webp.Encode(buffer, img, 85)
	if err != nil {
		return err
	}
	return os.WriteFile(filePath, buffer.Bytes(), 0644)
}
