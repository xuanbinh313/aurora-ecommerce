package product

import (
	"encoding/json"
	"errors"
)

var sampleProducts = []Product{
	{
		ProductBase: ProductBase{
			ID:            "1",
			IDType:        IDTypeUPC,
			CategoryId:    "cat1",
			Title:         "Sample Product 1",
			Brand:         "Brand A",
			Manufacturer:  "Manufacturer A",
			MFRPartNumber: "MFR123",
		},
		ID:           "1",
		Name:         "Sample Product 1",
		Slug:         "sample-product-1",
		Description:  "This is a sample product 1",
		Images:       []string{"image1.jpg", "image2.jpg"},
		Width:        Unit{UnitType: IDInches, Value: 10},
		Height:       Unit{UnitType: IDInches, Value: 20},
		Length:       Unit{UnitType: IDInches, Value: 30},
		Price:        100.0,
		SalePrice:    90.0,
		Stock:        50,
		ShippingType: "domestic",
		ShippingRaw: func() json.RawMessage {
			raw, _ := json.Marshal(map[string]interface{}{"weight": 12})
			return raw
		}(),
	},
	{
		ProductBase: ProductBase{
			ID:            "2",
			IDType:        IDTypeEAN,
			CategoryId:    "cat2",
			Title:         "Sample Product 2",
			Brand:         "Brand B",
			Manufacturer:  "Manufacturer B",
			MFRPartNumber: "MFR456",
		},
		ID:           "2",
		Name:         "Sample Product 2",
		Slug:         "sample-product-2",
		Description:  "This is a sample product 2",
		Images:       []string{"image3.jpg", "image4.jpg"},
		Width:        Unit{UnitType: IDFeet, Value: 5},
		Height:       Unit{UnitType: IDFeet, Value: 10},
		Length:       Unit{UnitType: IDFeet, Value: 15},
		Price:        200.0,
		SalePrice:    180.0,
		Stock:        30,
		ShippingType: "international",
		ShippingRaw: func() json.RawMessage {
			raw, _ := json.Marshal(map[string]interface{}{"weight": 12, "countryOfOrigin": "en", "hsCode": "610910"})
			return raw
		}(),
	},
}

type Repository interface {
	Create(base ProductBase, product Product) error
	Update(p Product) (*Product, error)
	Find() []Product
	FindOne(id string) (*Product, error)
	DeleteOne(id string) (*Product, error)
}

func NewMemoryRepository() Repository {
	return &memoryRepository{products: sampleProducts}
}

type memoryRepository struct {
	products []Product
}

func (r *memoryRepository) Find() []Product {
	return r.products
}

func (r *memoryRepository) Create(b ProductBase, p Product) error {
	for _, product := range r.products {
		if p.ID == product.ID {
			return errors.New("product already exists")
		}
	}
	r.products = append(r.products, p)
	return nil
}

// Update implements Repository.
func (r *memoryRepository) Update(p Product) (*Product, error) {
	for index, product := range r.products {
		if p.ID == product.ID {
			r.products[index] = p
			return &p, nil
		}
	}
	return nil, errors.New("Product not found")
}

func (r *memoryRepository) FindOne(id string) (*Product, error) {
	for _, product := range r.products {
		if product.ID == id {
			return &product, nil
		}
	}
	return nil, errors.New("Product not found")
}

// DeleteOne implements Repository.
func (r *memoryRepository) DeleteOne(id string) (*Product, error) {
	for index, product := range r.products {
		if product.ID == id {
			r.products = append(r.products[:index], r.products[index+1:]...)
			return &product, nil
		}
	}
	return nil, errors.New("Product not found")
}
