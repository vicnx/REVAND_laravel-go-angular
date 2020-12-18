package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	// "github.com/jinzhu/gorm"
	"goApp/common"
	"goApp/src"
)

// func Migrate(db *gorm.DB) {
// 	products.AutoMigrate()
// }

func main() {
	db := common.Init()
	// Migrate(db)
	defer db.Close()
	r := gin.Default()
	MakeRoutes(r)
	v1 := r.Group("/api")

	products.ProductsRoutes(v1.Group("/products"))

	// // NO TOKEN
	// v1.Use(users.AuthMiddleware(false))
	// products.ProductsNoAuthed(v1.Group("/product"))
	
    // // SI TOKEN
	// v1.Use(users.AuthMiddleware(true))
	// products.ProductsAuthed(v1.Group("/products"))

	fmt.Printf("0.0.0.0:8080")
	r.Run(":8080")
}

func MakeRoutes(r *gin.Engine) {
	cors := func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("Content-Type", "application/json")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		}
		c.Next()
	}
	r.Use(cors)
}
