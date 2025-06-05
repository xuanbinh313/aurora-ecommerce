package application

import (
	"context"
	categoryService "ecommerce/internal/category/application"
	"ecommerce/internal/common"
	"ecommerce/internal/common/utils"
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/dto"
	"ecommerce/internal/product/infra"
	uploadService "ecommerce/internal/upload/application"

	"github.com/gosimple/slug"
)

type ProductService interface {
	GetProducts(ctx context.Context, query common.PaginationQuery) (common.PaginationResponse[[]domain.Product], error)
	GetProductById(ctx context.Context, id uint) (*domain.Product, error)
	DeleteProductById(ctx context.Context, id uint) (*domain.Product, error)
	CreateProduct(ctx context.Context, p dto.CreateProductRequestDto) error
	UpdateProduct(ctx context.Context, id uint, p dto.UpdateProductRequestDto) (*domain.Product, error)
}

type productService struct {
	productRepo     *infra.ProductRepository
	categoryService categoryService.CategoryService
	uploadService   uploadService.UploadService
}

func NewProductService(productRepo *infra.ProductRepository, categoryService categoryService.CategoryService, uploadService uploadService.UploadService) ProductService {
	return &productService{productRepo: productRepo, categoryService: categoryService, uploadService: uploadService}
}

// CreateProduct implements Service.
func (p *productService) CreateProduct(ctx context.Context, req dto.CreateProductRequestDto) error {
	var categoryIDs []uint
	// Assuming req.Categories contains category names, join them as a comma-separated string
	// If req.Categories contains IDs, parse them accordingly
	if req.Categories != nil {
		for _, cat := range *req.Categories {
			// Try to parse as uint, if fails, treat as name
			if id, err := utils.ParseUint(cat); err == nil {
				categoryIDs = append(categoryIDs, id)
			}
		}
	}
	categories, err := p.categoryService.GetCategoriesByIDs(ctx, categoryIDs)
	if err != nil {
		return err
	}
	product := domain.Product{
		Name:             req.Name,
		Slug:             generateUniqueSlug(req.Name),
		ShortDescription: req.ShortDescription,
		SalePrice:        req.SalePrice.Value,
		RegularPrice:     req.RegularPrice.Value,
		Categories:       categories,
		Status:           *req.Status,
		Visibility:       *req.Visibility,
		Thumbnail:        req.Thumbnail,
		Images:           req.Images,
	}
	return p.productRepo.Create(&product)
}

// UpdateProduct implements Service.
func (p *productService) UpdateProduct(ctx context.Context, id uint, req dto.UpdateProductRequestDto) (*domain.Product, error) {
	existingProduct, err := p.productRepo.FindById(id)
	if err != nil {
		return nil, err
	}
	var categoryIDs []uint
	if req.Categories != nil {
		for _, cat := range *req.Categories {
			// Try to parse as uint, if fails, treat as name
			if id, err := utils.ParseUint(cat); err == nil {
				categoryIDs = append(categoryIDs, id)
			}
		}
	}
	categories, err := p.categoryService.GetCategoriesByIDs(ctx, categoryIDs)
	if err != nil {
		return nil, err
	}
	var existThumbnail *uint
	if req.ThumbnailID != nil && *req.ThumbnailID != "" {
		thumbnailID, err := utils.ParseUint(*req.ThumbnailID)
		if err != nil {
			return nil, err
		}
		thumbnail, err := p.uploadService.GetUploadByID(ctx, thumbnailID)
		if err != nil {
			return nil, err
		}
		existThumbnail = &thumbnail.ID
	}
	var imageIDs []uint = []uint{}
	if len(req.ImageIDs) > 0 {
		for _, cat := range req.ImageIDs {
			// Try to parse as uint, if fails, treat as name
			if id, err := utils.ParseUint(cat); err == nil {
				imageIDs = append(imageIDs, id)
			}
		}
	}

	if len(imageIDs) > 0 {
		images, err := p.uploadService.GetUploadByIDs(ctx, imageIDs)
		if err != nil {
			return nil, common.NewAppError("BAD_REQUEST", "have problem with images", 400, nil)
		}
		existingProduct.Images = images
	}
	// Update fields
	existingProduct.Name = req.Name
	existingProduct.Slug = req.Slug
	existingProduct.ShortDescription = req.ShortDescription
	existingProduct.SalePrice = req.SalePrice.Value
	existingProduct.RegularPrice = req.RegularPrice.Value
	existingProduct.Categories = categories
	existingProduct.Status = req.Status
	existingProduct.Visibility = req.Visibility
	existingProduct.ThumbnailID = existThumbnail

	err = p.productRepo.Update(existingProduct)
	if err != nil {
		return nil, err
	}
	return existingProduct, nil
}

// DeleteProductById implements Service.
func (p *productService) DeleteProductById(ctx context.Context, id uint) (*domain.Product, error) {
	product, err := p.productRepo.Delete(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

// GetProductById implements Service.
func (p *productService) GetProductById(ctx context.Context, id uint) (*domain.Product, error) {
	var product domain.Product
	err := p.productRepo.BaseRepository.DB().Preload("Categories").Preload("Thumbnail").Preload("Images").First(&product, id).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}

// GetProducts implements Service.
func (p *productService) GetProducts(ctx context.Context, query common.PaginationQuery) (common.PaginationResponse[[]domain.Product], error) {
	response, err := p.productRepo.Find(query)
	return response, err
}

// Hàm tạo slug duy nhất
func generateUniqueSlug(name string) string {
	baseSlug := slug.Make(name)
	// uniqueSlug := baseSlug
	// counter := 1

	// // Kiểm tra nếu slug đã tồn tại
	// for {
	// 	var existing domain.Category
	// 	err := db.Where("slug = ?", uniqueSlug).First(&existing).Error
	// 	if err != nil {
	// 		// Không tìm thấy, slug là duy nhất
	// 		break
	// 	}

	// 	// Nếu tồn tại, thêm số đếm vào slug
	// 	counter++
	// 	uniqueSlug = fmt.Sprintf("%s-%d", baseSlug, counter)
	// }

	return baseSlug
}
