package domain

type Variant struct {
	ID                            string             `json:"id" binding:"required"`
	SKU                           string             `json:"sku" binding:"required"`
	Price                         float64            `json:"price" binding:"required,gt=0"`
	HasTax                        bool               `json:"hasTax" binding:"default=false"`
	SalePrice                     float64            `json:"salePrice" binding:"required,gt=0"`
	Tax                           float64            `json:"tax" binding:"required,gt=0"`
	Stock                         int                `json:"stock" binding:"required,gte=0"`
	Image                         string             `json:"image"` // optional
	Attributes                    []VariantAttribute `json:"attributes"`
	TrackQuantity                 bool               `json:"trackQuantity"`
	ContinueSellingWhenOutOfStock bool               `json:"continueSellingWhenOutOfStock"`
}

type VariantAttribute struct {
	ID    string `json:"id" binding:"required"`
	Name  string `json:"name" binding:"required"`  // e.g. Size, Color
	Value string `json:"value" binding:"required"` // e.g. L, Red
}
