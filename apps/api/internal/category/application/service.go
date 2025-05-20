package application

import (
	"context"
	"ecommerce/internal/category/domain"
	"ecommerce/internal/category/dto"
	"ecommerce/internal/category/infra"
	"ecommerce/internal/common"

	"github.com/gosimple/slug"
)

type CategoryService interface {
	GetCategories(ctx context.Context, query common.PaginationQuery) (common.PaginationResponse[[]domain.Category], error)
	GetCategoryById(ctx context.Context, id uint) (*domain.Category, error)
	DeleteCategoryById(ctx context.Context, id uint) (*domain.Category, error)
	CreateCategory(ctx context.Context, p dto.CreateCategoryDto) error
	UpdateCategory(ctx context.Context, id uint, p domain.Category) (*domain.Category, error)
	GetCategoriesByIDs(ctx context.Context, ids []uint) ([]domain.Category, error)
}

type categoryService struct {
	repo *infra.CategoryRepository
}

func NewCategoryService(repo *infra.CategoryRepository) CategoryService {
	return &categoryService{repo: repo}
}

// CreateCategory implements Service.
func (p *categoryService) CreateCategory(ctx context.Context, req dto.CreateCategoryDto) error {

	category := domain.Category{
		Name:     req.Name,
		Slug:     generateUniqueSlug(req.Name),
		ParentID: req.ParentID,
		// Description: req.Description,
		// Images:      req.Images,
		// // CategoryAttributes: req.CategoryAttributes,
		// Variants:  req.Variants,
		// Price:     req.Price,
		// SalePrice: req.SalePrice,
		// HasTax:    req.HasTax,
		// Tax:       req.Tax,
		// Stock:     req.Stock,
		// ShippingType:                  req.ShippingType,
		// ShippingRaw:                   req.ShippingRaw,
		// ShippingInfo:                  req.ShippingInfo,
	}
	return p.repo.Create(&category)
}

// UpdateCategory implements Service.
func (p *categoryService) UpdateCategory(ctx context.Context, id uint, updatedCategory domain.Category) (*domain.Category, error) {
	existingCategory, err := p.repo.FindById(id)
	if err != nil {
		return nil, err
	}

	// Update fields
	// existingCategory.Name = updatedCategory.Name
	// existingCategory.Slug = updatedCategory.Slug
	// existingCategory.Description = updatedCategory.Description
	// existingCategory.Images = updatedCategory.Images
	// existingCategory.CategoryAttributes = updatedCategory.CategoryAttributes
	// existingCategory.Variants = updatedCategory.Variants
	// existingCategory.Price = updatedCategory.Price
	// existingCategory.SalePrice = updatedCategory.SalePrice
	// existingCategory.HasTax = updatedCategory.HasTax
	// existingCategory.Tax = updatedCategory.Tax
	// existingCategory.Stock = updatedCategory.Stock
	// Add other fields as needed

	err = p.repo.Update(existingCategory)
	if err != nil {
		return nil, err
	}
	return existingCategory, nil
}

// DeleteCategoryById implements Service.
func (p *categoryService) DeleteCategoryById(ctx context.Context, id uint) (*domain.Category, error) {
	category, err := p.repo.Delete(id)
	if err != nil {
		return nil, err
	}
	return category, nil
}

// GetCategoryById implements Service.
func (p *categoryService) GetCategoryById(ctx context.Context, id uint) (*domain.Category, error) {
	category, err := p.repo.FindById(id)
	if err != nil {
		return nil, err
	}
	return category, nil
}

// GetCategories implements Service.
func (p *categoryService) GetCategories(ctx context.Context, query common.PaginationQuery) (common.PaginationResponse[[]domain.Category], error) {
	return p.repo.Find(query)
}

// GetCategoriesById implements Service.
func (p *categoryService) GetCategoriesByIDs(ctx context.Context, ids []uint) ([]domain.Category, error) {
	return p.repo.FindByNameOrIDs(ids)
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
