package main

import (
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
	"fmt"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := db.GetDB()
	r := gin.Default()
	// Serve static files from uploads folder
	r.Static("/uploads", "./uploads")
	fmt.Println(os.Getwd())
	// Cấu hình CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
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
	fmt.Println("TEST")
	r.Run(":8080")
}
