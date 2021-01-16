package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"goApp/common"
	"goApp/src"

	// "goApp/controllers"
	// "goApp/models"
	// "goApp/routers"
	// "goApp/serializers"
)

func Migrate(db *gorm.DB) {
	users.AutoMigrate()
	// awards.AutoMigrate()
}

func main() {
	db := common.Init()
	Migrate(db)
	defer db.Close()
	r := gin.Default()
	MakeRoutes(r)
	v1 := r.Group("/api")
	// stats := r.Group("/stats")

	

	// NO TOKEN
	// awards.AwardsAuthed(v1.Group("/awards"))
	v1.Use(users.AuthMiddleware(false))
	users.UsersRegister(v1.Group("/users"))
	users.UsersStats(v1.Group("/stats"))
	
	
	

    // SI TOKEN
	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))
	users.ProfileRegister(v1.Group("/profile"))
	// users.ProfileRegister(v1.Group("/profile"))

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
