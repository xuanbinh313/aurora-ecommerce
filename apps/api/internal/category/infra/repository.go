package infra

import (
	"ecommerce/internal/category/domain"
	"ecommerce/internal/common"

	"gorm.io/gorm"
)

// CategoryRepository extends BaseRepository
type CategoryRepository struct {
	*common.BaseRepository[domain.Category]
}

// NewCategoryRepository creates a new CategoryRepository
func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{
		BaseRepository: common.NewBaseRepository[domain.Category](db),
	}
}

// FindByNameOrIDs tìm kiếm category với name LIKE hoặc IDs
func (r *CategoryRepository) FindByNameOrIDs(ids []uint) ([]domain.Category, error) {
	var categories []domain.Category
	query := r.BaseRepository.DB()
	// Tìm kiếm với IN cho ID nếu có
	if len(ids) > 0 {
		query = query.Where("id IN ?", ids)
	}

	err := query.Find(&categories).Error
	return categories, err
}
