package adapter

import (
	"ecommerce/internal/product/domain"
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
