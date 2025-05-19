package application

import (
	"context"
	categoryService "ecommerce/internal/category/application"
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/dto"
	"ecommerce/internal/product/infra"
	"ecommerce/utils"

	"github.com/gosimple/slug"
)

type ProductService interface {
	GetProducts(ctx context.Context) ([]domain.Product, error)
	GetProductById(ctx context.Context, id uint) (*domain.Product, error)
	DeleteProductById(ctx context.Context, id uint) (*domain.Product, error)
	CreateProduct(ctx context.Context, p dto.CreateProductRequestDto) error
	UpdateProduct(ctx context.Context, id uint, p domain.Product) (*domain.Product, error)
}

type productService struct {
	productRepo     *infra.ProductRepository
	categoryService categoryService.CategoryService
}

func NewProductService(productRepo *infra.ProductRepository, categoryService categoryService.CategoryService) ProductService {
	return &productService{productRepo: productRepo, categoryService: categoryService}
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
	}
	return p.productRepo.Create(&product)
}

// UpdateProduct implements Service.
func (p *productService) UpdateProduct(ctx context.Context, id uint, updatedProduct domain.Product) (*domain.Product, error) {
	existingProduct, err := p.productRepo.FindById(id)
	if err != nil {
		return nil, err
	}

	// Update fields
	existingProduct.Name = updatedProduct.Name
	existingProduct.Slug = updatedProduct.Slug
	existingProduct.Description = updatedProduct.Description
	existingProduct.Images = updatedProduct.Images

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
	err := p.productRepo.BaseRepository.DB().Preload("Categories").First(&product, id).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}

// GetProducts implements Service.
func (p *productService) GetProducts(ctx context.Context) ([]domain.Product, error) {
	return p.productRepo.Find()
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
