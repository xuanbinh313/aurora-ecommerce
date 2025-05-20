package infra

import (
	"ecommerce/internal/common"
	"ecommerce/internal/product/domain"

	"gorm.io/gorm"
)

// ProductRepository extends BaseRepository
type ProductRepository struct {
	*common.BaseRepository[domain.Product]
}

// NewProductRepository creates a new ProductRepository
func NewProductRepository(db *gorm.DB) *ProductRepository {
	return &ProductRepository{
		BaseRepository: common.NewBaseRepository[domain.Product](db),
	}
}

// func (p *ProductRepository) Find() ([]domain.Product, error) {
// 	var products []domain.Product
// 	err := p.DB().Preload("Categories").Find(&products).Error

// 	if err != nil {
// 		return nil, err
// 	}
// 	return products, nil
// }
