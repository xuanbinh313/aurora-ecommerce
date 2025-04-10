package product

type Service interface {
	GetProducts() []Product
	GetProductById(id string) (*Product, error)
	DeleteProductById(id string) (*Product, error)
	CreateProduct(p Product) error
	UpdateProduct(p Product) (*Product, error)
}

type productService struct {
	repo Repository
}

// CreateProduct implements Service.
func (p *productService) CreateProduct(product Product) error {
	return p.repo.Create(product)
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
