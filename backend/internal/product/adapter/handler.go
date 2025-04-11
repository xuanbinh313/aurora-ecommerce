package adapter

import (
	"ecommerce/internal/product/application"
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/dto"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IDUri struct {
	ID string `uri:"id" binding:"required"`
}

type Handler struct {
	service application.Service
}

func (h *Handler) GetProducts(c *gin.Context) {
	products := h.service.GetProducts()
	c.JSON(http.StatusOK, products)
}

func (h *Handler) GetProductById(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	product, err := h.service.GetProductById(uri.ID)
	if err != nil {
		RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, product)
}

func (h *Handler) CreateProduct(c *gin.Context) {
	var requestNewProduct dto.CreateProductRequestDto
	if err := c.ShouldBindJSON(&requestNewProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.service.CreateProduct(requestNewProduct); err != nil {
		RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusCreated, http.NoBody)
}

func (h *Handler) UpdateProduct(c *gin.Context) {
	var body domain.Product
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	product, err := h.service.UpdateProduct(body)
	if err != nil {
		RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, product)
}

func (h *Handler) DeleteProductById(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	_, err := h.service.DeleteProductById(uri.ID)
	if err != nil {
		RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, http.NoBody)
}
func NewHandler(s application.Service) *Handler {
	return &Handler{service: s}
}

func (h *Handler) RegisterRouter(r *gin.Engine) {
	productGroup := r.Group("/products")
	{
		productGroup.GET("/", h.GetProducts)
		productGroup.GET("/:id", h.GetProductById)
		productGroup.POST("/", h.CreateProduct)
		productGroup.PUT("/:id", h.UpdateProduct)
		productGroup.DELETE("/:id", h.DeleteProductById)
	}
}
