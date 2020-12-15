package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"goApp/common"
	// "goApp/awards"
	"goApp/redis"
	"goApp/users"
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

	// NO TOKEN
	// awards.AwardsAuthed(v1.Group("/awards"))
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))
	redis.Routers(v1.Group("/redis"))

    // SI TOKEN
	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))

	fmt.Printf("0.0.0.0:3000")
	r.Run(":3000")
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
