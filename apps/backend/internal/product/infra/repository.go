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

// type Repository interface {
// 	Create(product domain.Product) error
// 	Update(p domain.Product) (*domain.Product, error)
// 	Find() ([]domain.Product, error)
// 	FindOne(id uint) (*domain.Product, error)
// 	DeleteOne(id uint) (*domain.Product, error)
// }

// func NewRepository() Repository {
// 	return &repo{}
// }

// type repo struct {
// 	products []domain.Product
// }

// func (r *repo) Find() ([]domain.Product, error) {
// 	var products []domain.Product
// 	err := db.GetDB().Find(&products).Error
// 	return products, err
// }

// func (r *repo) Create(p domain.Product) error {
// 	for _, product := range r.products {
// 		if p.ID == product.ID {
// 			return domain.ErrNotFound
// 		}
// 	}
// 	r.products = append(r.products, p)
// 	return nil
// }

// // Update implements Repository.
// func (r *repo) Update(p domain.Product) (*domain.Product, error) {
// 	for index, product := range r.products {
// 		if p.ID == product.ID {
// 			r.products[index] = p
// 			return &p, nil
// 		}
// 	}
// 	return nil, domain.ErrNotFound
// }

// func (r *repo) FindOne(id uint) (*domain.Product, error) {
// 	for _, product := range r.products {
// 		if product.ID == id {
// 			return &product, nil
// 		}
// 	}
// 	return nil, domain.ErrNotFound
// }

// // DeleteOne implements Repository.
// func (r *repo) DeleteOne(id uint) (*domain.Product, error) {
// 	for index, product := range r.products {
// 		if product.ID == id {
// 			r.products = append(r.products[:index], r.products[index+1:]...)
// 			return &product, nil
// 		}
// 	}
// 	return nil, domain.ErrNotFound
// }
