package product

type Service interface {
	GetProducts() []Product
	GetProductById(id string) (*Product, error)
	DeleteProductById(id string) (*Product, error)
	CreateProduct(p CreateProductRequest) error
	UpdateProduct(p Product) (*Product, error)
}

type productService struct {
	repo Repository
}

// CreateProduct implements Service.
func (p *productService) CreateProduct(req CreateProductRequest) error {
	base := ProductBase{
		ID:            req.ID,
		IDType:        req.IDType,
		CategoryId:    req.CategoryId,
		Title:         req.Title,
		Brand:         req.Brand,
		Manufacturer:  req.Manufacturer,
		MFRPartNumber: req.MFRPartNumber,
	}
	product := Product{
		ProductBase:                   base,
		Name:                          req.Name,
		Slug:                          req.Slug,
		Description:                   req.Description,
		Images:                        req.Images,
		Width:                         req.Width,
		Height:                        req.Height,
		Length:                        req.Length,
		ProductAttributes:             req.ProductAttributes,
		Variants:                      req.Variants,
		Tags:                          req.Tags,
		Price:                         req.Price,
		SalePrice:                     req.SalePrice,
		HasTax:                        req.HasTax,
		Tax:                           req.Tax,
		Stock:                         req.Stock,
		TrackQuantity:                 req.TrackQuantity,
		ContinueSellingWhenOutOfStock: req.ContinueSellingWhenOutOfStock,
		ShippingType:                  req.ShippingType,
		ShippingRaw:                   req.ShippingRaw,
		ShippingInfo:                  req.ShippingInfo,
	}
	return p.repo.Create(base, product)
}

// UpdateProduct implements Service.
func (p *productService) UpdateProduct(product Product) (*Product, error) {
	return p.repo.Update(product)
}

// DeleteProductById implements Service.
func (p *productService) DeleteProductById(id string) (*Product, error) {
	return p.repo.DeleteOne(id)
}

// GetProductById implements Service.
func (p *productService) GetProductById(id string) (*Product, error) {
	return p.repo.FindOne(id)
}

// GetProducts implements Service.
func (p *productService) GetProducts() []Product {
	return p.repo.Find()
}

func NewService(r Repository) Service {
	return &productService{repo: r}
}
