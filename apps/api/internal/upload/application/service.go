package application

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"ecommerce/internal/common"
	"ecommerce/internal/upload/domain"
	"ecommerce/internal/upload/infra"
	"encoding/base64"
	"fmt"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/nfnt/resize"
)

type UploadService interface {
	Upload(ctx context.Context, file string) (*domain.Media, error)
	GenerateUploadSignature(ctx context.Context, path string, expires int64) string
	GetUploads(ctx context.Context, query common.PaginationQuery) (common.PaginationResponse[[]domain.Media], error)
	GetUploadByID(ctx context.Context, id uint) (*domain.Media, error)
	GetUploadByIDs(ctx context.Context, ids []uint) ([]domain.Media, error)
}

type uploadService struct {
	repo *infra.UploadRepository
}

// GetUploadByID implements UploadService.
func (s *uploadService) GetUploadByID(ctx context.Context, id uint) (*domain.Media, error) {
	response, err := s.repo.FindById(id)
	return response, err
}

// GetUploadByID implements UploadService.
func (s *uploadService) GetUploadByIDs(ctx context.Context, ids []uint) ([]domain.Media, error) {
	response, err := s.repo.FindByNameOrIDs(ids)
	return response, err
}

// GetUploads implements UploadService.
func (s *uploadService) GetUploads(ctx context.Context, query common.PaginationQuery) (common.PaginationResponse[[]domain.Media], error) {
	response, err := s.repo.Find(query)
	return response, err
}

func (s *uploadService) GenerateUploadSignature(ctx context.Context, path string, expires int64) string {
	message := fmt.Sprintf("UPLOAD:%s:%d", path, expires)
	mac := hmac.New(sha256.New, []byte(secretKey))
	mac.Write([]byte(message))
	return base64.URLEncoding.EncodeToString(mac.Sum(nil))
}

func NewUpload(repo *infra.UploadRepository) UploadService {
	return &uploadService{repo: repo}
}

// Upload implements Service.
func (s *uploadService) Upload(ctx context.Context, file string) (*domain.Media, error) {
	media, err := s.processAndSaveFile(file)
	if err != nil {
		return nil, err
	}
	if err := s.repo.Create(media); err != nil {
		return nil, err
	}
	return media, nil
}

const (
	secretKey = "your-secret-key"
)

// processAndSaveFile xử lý file và trả về metadata
func (s *uploadService) processAndSaveFile(file string) (*domain.Media, error) {
	src, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer src.Close()

	img, _, err := image.Decode(src)
	if err != nil {
		return nil, fmt.Errorf("invalid image format: %v", err)
	}

	srcAgain, err := os.Open(file) // mở lại để đọc định dạng gốc
	if err != nil {
		return nil, err
	}
	defer srcAgain.Close()

	_, format, err := image.DecodeConfig(srcAgain)
	if err != nil {
		return nil, fmt.Errorf("cannot detect image format: %v", err)
	}

	sizes := map[string][2]int{
		"thumbnail": {150, 150},
		"medium":    {300, 300},
		"large":     {1024, 1024},
		"original":  {0, 0},
	}

	uid := uuid.New().String()
	dir := fmt.Sprintf("uploads/%s/%s/", time.Now().Format("2006"), time.Now().Format("01"))
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		return nil, err
	}

	for sizeName, size := range sizes {
		var resized image.Image
		if size[0] > 0 {
			// Center crop thành hình vuông trước khi resize
			cropSize := min(img.Bounds().Dx(), img.Bounds().Dy())
			centerCropped := cropCenter(img, cropSize, cropSize)
			resized = resize.Resize(uint(size[0]), uint(size[1]), centerCropped, resize.Lanczos3)
		} else {
			resized = img
		}

		outputPath := filepath.Join(dir, fmt.Sprintf("%s_%s.%s", uid, sizeName, format))
		outFile, err := os.Create(outputPath)
		if err != nil {
			return nil, fmt.Errorf("create file failed: %w", err)
		}
		defer outFile.Close()

		switch format {
		case "jpeg", "jpg":
			err = jpeg.Encode(outFile, resized, &jpeg.Options{Quality: 85})
		case "png":
			err = png.Encode(outFile, resized)
		default:
			return nil, fmt.Errorf("unsupported image format: %s", format)
		}

		if err != nil {
			return nil, fmt.Errorf("encode %s failed: %w", format, err)
		}
	}

	return &domain.Media{
		Name:      uid,
		Src:       dir,
		MediaType: "image/" + format,
	}, nil
}
func cropCenter(img image.Image, width, height int) image.Image {
	originalBounds := img.Bounds()
	originalWidth := originalBounds.Dx()
	originalHeight := originalBounds.Dy()

	// Nếu ảnh nhỏ hơn size cần crop => không crop
	if originalWidth < width || originalHeight < height {
		return img
	}

	startX := (originalWidth - width) / 2
	startY := (originalHeight - height) / 2

	cropRect := image.Rect(0, 0, width, height)
	croppedImg := image.NewRGBA(cropRect)

	draw.Draw(croppedImg, cropRect, img, image.Point{X: startX, Y: startY}, draw.Src)
	return croppedImg
}
