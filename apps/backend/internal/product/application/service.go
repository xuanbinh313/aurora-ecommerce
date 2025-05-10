package application

import (
	"context"
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/dto"
	"ecommerce/internal/product/infra"
)

type Service interface {
	GetProducts(ctx context.Context) ([]domain.Product, error)
	GetProductById(ctx context.Context, id uint) (*domain.Product, error)
	DeleteProductById(ctx context.Context, id uint) (*domain.Product, error)
	CreateProduct(ctx context.Context, p dto.CreateProductRequestDto) error
	UpdateProduct(ctx context.Context, id uint, p domain.Product) (*domain.Product, error)
}

type productService struct {
	repo *infra.ProductRepository
}

func NewService(repo *infra.ProductRepository) Service {
	return &productService{repo: repo}
}

// CreateProduct implements Service.
func (p *productService) CreateProduct(ctx context.Context, req dto.CreateProductRequestDto) error {

	product := domain.Product{
		Name:        req.Name,
		Slug:        req.Slug,
		Description: req.Description,
		Images:      req.Images,
		// ProductAttributes: req.ProductAttributes,
		Variants:  req.Variants,
		Price:     req.Price,
		SalePrice: req.SalePrice,
		HasTax:    req.HasTax,
		Tax:       req.Tax,
		Stock:     req.Stock,
		// ShippingType:                  req.ShippingType,
		// ShippingRaw:                   req.ShippingRaw,
		// ShippingInfo:                  req.ShippingInfo,
	}
	return p.repo.Create(&product)
}

// UpdateProduct implements Service.
func (p *productService) UpdateProduct(ctx context.Context, id uint, updatedProduct domain.Product) (*domain.Product, error) {
	existingProduct, err := p.repo.FindById(id)
	if err != nil {
		return nil, err
	}

	// Update fields
	existingProduct.Name = updatedProduct.Name
	existingProduct.Slug = updatedProduct.Slug
	existingProduct.Description = updatedProduct.Description
	existingProduct.Images = updatedProduct.Images
	existingProduct.ProductAttributes = updatedProduct.ProductAttributes
	existingProduct.Variants = updatedProduct.Variants
	existingProduct.Price = updatedProduct.Price
	existingProduct.SalePrice = updatedProduct.SalePrice
	existingProduct.HasTax = updatedProduct.HasTax
	existingProduct.Tax = updatedProduct.Tax
	existingProduct.Stock = updatedProduct.Stock
	// Add other fields as needed

	err = p.repo.Update(existingProduct)
	if err != nil {
		return nil, err
	}
	return existingProduct, nil
}

// DeleteProductById implements Service.
func (p *productService) DeleteProductById(ctx context.Context, id uint) (*domain.Product, error) {
	product, err := p.repo.Delete(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

// GetProductById implements Service.
func (p *productService) GetProductById(ctx context.Context, id uint) (*domain.Product, error) {
	product, err := p.repo.FindById(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

// GetProducts implements Service.
func (p *productService) GetProducts(ctx context.Context) ([]domain.Product, error) {
	return p.repo.Find()
}
