package infra

import (
	"ecommerce/internal/product/domain"

	"gorm.io/gorm"
)

var sampleProducts = []domain.Product{
	{
		Name:        "Sample Product 1",
		Slug:        "sample-product-1",
		Description: "This is a sample product 1",
		Images:      []string{"image1.jpg", "image2.jpg"},
		Price:       100.0,
		SalePrice:   90.0,
		Stock:       50,
		// ShippingType: "domestic",
		// ShippingRaw: func() json.RawMessage {
		// 	raw, _ := json.Marshal(map[string]interface{}{"weight": 12})
		// 	return raw
		// }(),
	},
	{

		Name:        "Sample Product 2",
		Slug:        "sample-product-2",
		Description: "This is a sample product 2",
		Images:      []string{"image3.jpg", "image4.jpg"},
		Price:       200.0,
		SalePrice:   180.0,
		Stock:       30,
		// ShippingType: "international",
		// ShippingRaw: func() json.RawMessage {
		// 	raw, _ := json.Marshal(map[string]interface{}{"weight": 12, "countryOfOrigin": "en", "hsCode": "610910"})
		// 	return raw
		// }(),
	},
}

type Repository interface {
	Create(product domain.Product) error
	Update(p domain.Product) (*domain.Product, error)
	Find() []domain.Product
	FindOne(id uint) (*domain.Product, error)
	DeleteOne(id uint) (*domain.Product, error)
}

func NewMemoryRepository(db *gorm.DB) Repository {
	return &memoryRepository{products: sampleProducts}
}

type memoryRepository struct {
	products []domain.Product
}

func (r *memoryRepository) Find() []domain.Product {
	return r.products
}

func (r *memoryRepository) Create(p domain.Product) error {
	for _, product := range r.products {
		if p.ID == product.ID {
			return domain.ErrNotFound
		}
	}
	r.products = append(r.products, p)
	return nil
}

// Update implements Repository.
func (r *memoryRepository) Update(p domain.Product) (*domain.Product, error) {
	for index, product := range r.products {
		if p.ID == product.ID {
			r.products[index] = p
			return &p, nil
		}
	}
	return nil, domain.ErrNotFound
}

func (r *memoryRepository) FindOne(id uint) (*domain.Product, error) {
	for _, product := range r.products {
		if product.ID == id {
			return &product, nil
		}
	}
	return nil, domain.ErrNotFound
}

// DeleteOne implements Repository.
func (r *memoryRepository) DeleteOne(id uint) (*domain.Product, error) {
	for index, product := range r.products {
		if product.ID == id {
			r.products = append(r.products[:index], r.products[index+1:]...)
			return &product, nil
		}
	}
	return nil, domain.ErrNotFound
}
