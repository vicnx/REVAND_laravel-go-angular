package main
import (
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/jinzhu/gorm"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/awards"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/users"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"

)

func Migrate(db *gorm.DB) {
	// users.AutoMigrate()
	db.AutoMigrate(&awards.Awards{}) //generate table Awards
	db.AutoMigrate(&users.UserModel{}) //generate table Awards
	// db.AutoMigrate(&articles.TagModel{})
	// db.AutoMigrate(&articles.FavoriteModel{})
	// db.AutoMigrate(&articles.ArticleUserModel{})
	// db.AutoMigrate(&articles.CommentModel{})
}



func main() {
	//Conection db
	db := common.Init()
	Migrate(db)
	defer db.Close()

	r := gin.Default()

	MakeRoutes(r)

	v1 := r.Group("/api")
	
	awards.AwardsAuthed(v1.Group("/awards"))
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))


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
