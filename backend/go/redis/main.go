package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"goApp/src"
)

func main() {
	r := gin.Default()
	MakeRoutes(r)
	v1 := r.Group("/api")
	redis.Routers(v1.Group("/redis"))
	fmt.Printf("0.0.0.0:8080")
	r.Run(":8080")
}

func MakeRoutes(r *gin.Engine) {
	cors := func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Username")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("Content-Type", "application/json")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		}
		c.Next()
	}
	r.Use(cors)
}