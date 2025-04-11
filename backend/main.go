package main

import (
	"ecommerce/config"
	"ecommerce/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	r := gin.Default()
	routes.RegisterRouter(r)
	r.Run(":8080")
}
