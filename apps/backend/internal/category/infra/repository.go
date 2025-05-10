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
