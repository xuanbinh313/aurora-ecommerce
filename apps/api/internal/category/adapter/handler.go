package category

import (
	"ecommerce/internal/category/application"
	"ecommerce/internal/category/domain"
	"ecommerce/internal/category/dto"
	"ecommerce/internal/common"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type IDUri struct {
	ID string `uri:"id" binding:"required"`
}

type Handler struct {
	service application.CategoryService
}

func (h *Handler) GetCategories(c *gin.Context) {
	categories, _ := h.service.GetCategories(c.Request.Context())
	c.JSON(http.StatusOK, categories)
}

func (h *Handler) GetCategoryById(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	id, err := strconv.ParseUint(uri.ID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	category, err := h.service.GetCategoryById(c.Request.Context(), uint(id))
	if err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, category)
}

func (h *Handler) CreateCategory(c *gin.Context) {
	var requestNewCategory dto.CreateCategoryDto
	if err := c.ShouldBindJSON(&requestNewCategory); err != nil {
		if validationErrs := domain.ParseValidationErrors(err, requestNewCategory); validationErrs != nil {
			c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrs})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.service.CreateCategory(c.Request.Context(), requestNewCategory); err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusCreated, http.NoBody)
}

func (h *Handler) UpdateCategory(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	id, err := strconv.ParseUint(uri.ID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}
	var body domain.Category
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	category, err := h.service.UpdateCategory(c.Request.Context(), uint(id), body)
	if err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, category)
}

func (h *Handler) DeleteCategoryById(c *gin.Context) {
	var uri IDUri
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
	}
	id, err := strconv.ParseUint(uri.ID, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	if _, err := h.service.DeleteCategoryById(c.Request.Context(), uint(id)); err != nil {
		common.RespondWithError(c, err)
		return
	}
	c.JSON(http.StatusOK, http.NoBody)
}
func NewHandler(service application.CategoryService) *Handler {
	return &Handler{service: service}
}

func (h *Handler) RegisterRouter(r *gin.RouterGroup) {
	categoryGroup := r.Group("/categories")
	{
		categoryGroup.GET("/", h.GetCategories)
		categoryGroup.GET("/:id", h.GetCategoryById)
		categoryGroup.POST("/", h.CreateCategory)
		categoryGroup.PUT("/:id", h.UpdateCategory)
		categoryGroup.DELETE("/:id", h.DeleteCategoryById)
	}
}
