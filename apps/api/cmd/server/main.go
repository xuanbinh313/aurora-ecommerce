package main

import (
	"ecommerce/config"
	categoryAdapter "ecommerce/internal/category/adapter"
	categoryApplication "ecommerce/internal/category/application"
	categoryInfra "ecommerce/internal/category/infra"
	"ecommerce/internal/db"
	productAdapter "ecommerce/internal/product/adapter"
	productApplication "ecommerce/internal/product/application"
	productInfra "ecommerce/internal/product/infra"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	db := db.GetDB()
	r := gin.Default()
	// Migrate Database
	productInfra.MigrateProductDB()
	categoryInfra.MigrateCategoryDB()
	// Initialize Repositories
	productRepo := productInfra.NewProductRepository(db)
	categoryRepo := categoryInfra.NewCategoryRepository(db)
	// Initialize Services
	categoryService := categoryApplication.NewCategoryService(categoryRepo)
	productService := productApplication.NewProductService(productRepo, categoryService)
	api := r.Group("/api")
	productAdapter.RegisterRouter(api, productService)
	categoryAdapter.RegisterRouter(api, categoryService)
	r.Run(":8080")
}
