```go
package main

import (
	"net/http"

	"ecommerce/internal/product"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// generate 5 products data sample
var products = []product.Product{
	{
		ID:            "1",
		IDType:        product.IDTypeUPC,
		CategoryId:    "electronics",
		Title:         "Smartphone",
		Brand:         "TechBrand",
		Manufacturer:  "TechBrand Inc.",
		MFRPartNumber: "TB12345",
		Slug:          "smartphone-techbrand",
		Images:        []string{"image1.jpg", "image2.jpg"},
		MainImage:     "main_image.jpg",
		Description:   "A high-quality smartphone.",
		Price:         699.99,
	},
	{
		ID:            "2",
		IDType:        product.IDTypeEAN,
		CategoryId:    "appliances",
		Title:         "Microwave Oven",
		Brand:         "HomeAppliance",
		Manufacturer:  "HomeAppliance Co.",
		MFRPartNumber: "HA67890",
		Slug:          "microwave-oven-homeappliance",
		Images:        []string{"image3.jpg", "image4.jpg"},
		MainImage:     "main_image2.jpg",
		Description:   "A compact microwave oven.",
		Price:         149.99,
	},
	{
		ID:            "3",
		IDType:        product.IDTypeGCID,
		CategoryId:    "furniture",
		Title:         "Office Chair",
		Brand:         "ComfortSeating",
		Manufacturer:  "ComfortSeating Ltd.",
		MFRPartNumber: "CS54321",
		Slug:          "office-chair-comfortseating",
		Images:        []string{"image5.jpg", "image6.jpg"},
		MainImage:     "main_image3.jpg",
		Description:   "An ergonomic office chair.",
		Price:         199.99,
	},
	{
		ID:            "4",
		IDType:        product.IDTypeUPC,
		CategoryId:    "gaming",
		Title:         "Gaming Console",
		Brand:         "GameTech",
		Manufacturer:  "GameTech Corp.",
		MFRPartNumber: "GT98765",
		Slug:          "gaming-console-gametech",
		Images:        []string{"image7.jpg", "image8.jpg"},
		MainImage:     "main_image4.jpg",
		Description:   "A next-gen gaming console.",
		Price:         499.99,
	},
	{
		ID:            "5",
		IDType:        product.IDTypeEAN,
		CategoryId:    "books",
		Title:         "Programming Book",
		Brand:         "CodeMaster",
		Manufacturer:  "CodeMaster Press",
		MFRPartNumber: "CM11223",
		Slug:          "programming-book-codemaster",
		Images:        []string{"image9.jpg", "image10.jpg"},
		MainImage:     "main_image5.jpg",
		Description:   "A comprehensive guide to programming.",
		Price:         39.99,
	},
}
var validate = validator.New()

func main() {
	r := gin.Default()
	r.POST("/products", createProduct)
	r.GET("/products", getProducts)
	r.GET("/products/:id", getProductById)
	r.PUT("/products/:id", updateProduct)
	r.DELETE("/products/:id", deleteProduct)
	r.Run(":8080")
}

// get all products
func getProducts(c *gin.Context) {
	c.JSON(http.StatusOK, products)
}

// get one product
func getProductById(c *gin.Context) {
	id := c.Param("id")
	isValidNumber := validate.Var(id, "required,number")
	if err := isValidNumber; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	for _, p := range products {
		if p.ID == id {
			c.JSON(http.StatusOK, p)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
}

// create product
func createProduct(c *gin.Context) {
	var newProduct product.Product
	if err := c.ShouldBindJSON(&newProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := validate.Struct(newProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"validation_error": err.Error()})
		return
	}
	products = append(products, newProduct)
	c.JSON(http.StatusCreated, newProduct)
}

// delete product
func deleteProduct(c *gin.Context) {
	id := c.Param("id")
	isValidNumber := validate.Var(id, "required,number")
	if err := isValidNumber; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	for i, p := range products {
		if p.ID == id {
			products = append(products[:i], products[i+1:]...)
			c.JSON(http.StatusOK, gin.H{"message": "Product deleted"})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Not found product"})
}

// update product
func updateProduct(c *gin.Context) {
	id := c.Param("id")
	isValidNumber := validate.Var(id, "required,number")
	if err := isValidNumber; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	var updatedProduct product.Product
	if err := c.ShouldBindJSON(&updatedProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := validate.Struct(updatedProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"validation_error": err.Error()})
		return
	}
	for i, p := range products {
		if p.ID == id {
			products[i] = updatedProduct
			c.JSON(http.StatusOK, updatedProduct)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "Not found product"})
}
```
