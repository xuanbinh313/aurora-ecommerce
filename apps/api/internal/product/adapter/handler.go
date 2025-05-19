package product

import (
	"ecommerce/internal/common"
	"ecommerce/internal/product/application"
	"ecommerce/internal/product/domain"
	"ecommerce/internal/product/dto"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type IDUri struct {
	ID string `uri:"id" binding:"required"`
}

type Handler struct {
	service application.ProductService
}

func (h *Handler) GetProducts(c *gin.Context) {
	products, _ := h.service.GetProducts(c.Request.Context())
	c.JSON(http.StatusOK, products)
}

func (h *Handler) GetProductById(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	id, err := strconv.ParseUint(uri.ID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	product, err := h.service.GetProductById(c.Request.Context(), uint(id))
	if err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, product)
}

func (h *Handler) CreateProduct(c *gin.Context) {
	var requestNewProduct dto.CreateProductRequestDto
	if err := c.ShouldBindJSON(&requestNewProduct); err != nil {
		if validationErrs := domain.ParseValidationErrors(err, requestNewProduct); validationErrs != nil {
			c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrs})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.service.CreateProduct(c.Request.Context(), requestNewProduct); err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusCreated, http.NoBody)
}

func (h *Handler) UpdateProduct(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	id, err := strconv.ParseUint(uri.ID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	var body domain.Product
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	product, err := h.service.UpdateProduct(c.Request.Context(), uint(id), body)
	if err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, product)
}

func (h *Handler) DeleteProductById(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	id, err := strconv.ParseUint(uri.ID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	if _, err := h.service.DeleteProductById(c.Request.Context(), uint(id)); err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, http.NoBody)
}
func NewHandler(service application.ProductService) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRouter(r *gin.RouterGroup) {
	productGroup := r.Group("/products")
	{
		productGroup.GET("/", h.GetProducts)
		productGroup.GET("/:id", h.GetProductById)
		productGroup.POST("/", h.CreateProduct)
		productGroup.PUT("/:id", h.UpdateProduct)
		productGroup.DELETE("/:id", h.DeleteProductById)
	}
}
