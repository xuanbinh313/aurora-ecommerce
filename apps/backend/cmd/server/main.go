package main

import (
	"ecommerce/config"
	categoryAdapter "ecommerce/internal/category/adapter"
	"ecommerce/internal/db"
	productAdapter "ecommerce/internal/product/adapter"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	db := db.GetDB()
	r := gin.Default()
	api := r.Group("/api")
	productAdapter.RegisterRouter(api, db)
	categoryAdapter.RegisterRouter(api, db)
	r.Run(":8080")
}
