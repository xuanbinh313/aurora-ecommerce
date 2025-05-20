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
	uploadAdapter "ecommerce/internal/upload/adapter"
	uploadApplication "ecommerce/internal/upload/application"
	uploadInfra "ecommerce/internal/upload/infra"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	db := db.GetDB()
	r := gin.Default()
	// Categories
	categoryInfra.MigrateCategoryDB()
	categoryRepo := categoryInfra.NewCategoryRepository(db)
	categoryService := categoryApplication.NewCategoryService(categoryRepo)
	// Products
	productInfra.MigrateProductDB()
	productRepo := productInfra.NewProductRepository(db)
	productService := productApplication.NewProductService(productRepo, categoryService)
	// Uploads
	uploadInfra.MigrateUploadDB()
	uploadRepo := uploadInfra.NewUploadRepository(db)
	uploadService := uploadApplication.NewUpload(uploadRepo)
	// Routers setup
	api := r.Group("/api")
	uploadAdapter.RegisterRouter(api, uploadService)
	productAdapter.RegisterRouter(api, productService)
	categoryAdapter.RegisterRouter(api, categoryService)
	r.Run(":8080")
}
