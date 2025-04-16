package application

import (
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/dto"
	"ecommerce/internal/product/infra"
)

type Service interface {
	GetProducts() []domain.Product
	GetProductById(id uint) (*domain.Product, error)
	DeleteProductById(id uint) (*domain.Product, error)
	CreateProduct(p dto.CreateProductRequestDto) error
	UpdateProduct(p domain.Product) (*domain.Product, error)
}

type productService struct {
	repo infra.Repository
}

// CreateProduct implements Service.
func (p *productService) CreateProduct(req dto.CreateProductRequestDto) error {

	product := domain.Product{
		Name:              req.Name,
		Slug:              req.Slug,
		Description:       req.Description,
		Images:            req.Images,
		ProductAttributes: req.ProductAttributes,
		Variants:          req.Variants,
		Price:             req.Price,
		SalePrice:         req.SalePrice,
		HasTax:            req.HasTax,
		Tax:               req.Tax,
		Stock:             req.Stock,
		// ShippingType:                  req.ShippingType,
		// ShippingRaw:                   req.ShippingRaw,
		// ShippingInfo:                  req.ShippingInfo,
	}
	return p.repo.Create(product)
}

// UpdateProduct implements Service.
func (p *productService) UpdateProduct(product domain.Product) (*domain.Product, error) {
	return p.repo.Update(product)
}

// DeleteProductById implements Service.
func (p *productService) DeleteProductById(id uint) (*domain.Product, error) {
	return p.repo.DeleteOne(id)
}

// GetProductById implements Service.
func (p *productService) GetProductById(id uint) (*domain.Product, error) {
	return p.repo.FindOne(id)
}

// GetProducts implements Service.
func (p *productService) GetProducts() []domain.Product {
	return p.repo.Find()
}

func NewService(r infra.Repository) Service {
	return &productService{repo: r}
}
