package middleware

import (
	"ecommerce/internal/common"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Next()
		err := ctx.Errors.Last()
		if err != nil {
			switch e := err.Err.(type) {
			case common.ValidationError:
				ctx.JSON(e.Status, gin.H{
					"error":   e.Code,
					"message": e.Message,
					"fields":  e.Fields,
				})
			default:
				// fallback
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "internal_error"})
			}

		}
	}
}
