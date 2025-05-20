package common

import (
	domain "ecommerce/internal/error"
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RespondWithError(c *gin.Context, err error) {
	if appErr, ok := err.(*domain.AppError); ok {
		c.JSON(appErr.Status, gin.H{
			"code":    appErr.Code,
			"message": appErr.Message,
		})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    "UNKNOWN_ERROR",
			"message": err.Error(),
		})
	}
}

type PaginationResponse[T any] struct {
	Data       T     `json:"data"`
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"total_pages"`
}
type PaginationQuery struct {
	Page         int
	Limit        int
	Search       string
	SearchFields []string // ví dụ: ["name", "email"]
	SortBy       string
	Order        string // "asc" | "desc"
	Preloads     []string
}

func PaginateResponse[T any](data T, page, limit int, total int64) PaginationResponse[T] {
	return PaginationResponse[T]{
		Data:       data,
		Page:       page,
		Limit:      limit,
		Total:      total,
		TotalPages: int(math.Ceil(float64(total) / float64(limit))),
	}
}
