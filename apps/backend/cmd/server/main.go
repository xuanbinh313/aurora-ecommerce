package main

import (
	"ecommerce/config"
	"ecommerce/internal/product/adapter"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	r := gin.Default()
	adapter.RegisterRouter(r)
	r.Run(":8080")
}
