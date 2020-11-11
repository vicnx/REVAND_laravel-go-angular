package main
import (
	"fmt"

	"gopkg.in/gin-gonic/gin.v1"

	"github.com/jinzhu/gorm"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/awards"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"

)

func Migrate(db *gorm.DB) {
	// users.AutoMigrate()
	db.AutoMigrate(&awards.Awards{}) //generate table Awards
	// db.AutoMigrate(&articles.TagModel{})
	// db.AutoMigrate(&articles.FavoriteModel{})
	// db.AutoMigrate(&articles.ArticleUserModel{})
	// db.AutoMigrate(&articles.CommentModel{})
}

// func awards(c *gin.Context){
// 	c.JSON(200, gin.H{"message":"Homepage"})
// 	fmt.Println(c)
// }

func main() {
	//Conection db
	db := common.Init()
	Migrate(db)
	defer db.Close()

	r := gin.Default()

	MakeRoutes(r)

	v1 := r.Group("/api")
	awards.AwardsAuthed(v1.Group("/awards"))
	// users.UsersRegister(v1.Group("/users"))
	// v1.Use(users.AuthMiddleware(false))
	// articles.ArticlesAnonymousRegister(v1.Group("/articles"))
	// articles.TagsAnonymousRegister(v1.Group("/tags"))

	// v1.Use(users.AuthMiddleware(true))
	// users.UserRegister(v1.Group("/user"))
	// users.ProfileRegister(v1.Group("/profiles"))
	// articles.ArticlesRegister(v1.Group("/articles"))

	// testAuth := r.Group("/api/ping")
	// testAuth.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": "pong",
	// 	})
	// })

	// test 1 to 1
	// tx1 := db.Begin()
	// userA := users.UserModel{
	// 	Username: "AAAAAAAAAAAAAAAA",
	// 	Email:    "aaaa@g.cn",
	// 	Bio:      "hehddeda",
	// 	Image:    nil,
	// }
	// tx1.Save(&userA)
	// tx1.Commit()
	// fmt.Println(userA)

	//db.Save(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//})
	//var userAA ArticleUserModel
	//db.Where(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//}).First(&userAA)
	//fmt.Println(userAA)

	//r.Run() // listen and serve on 0.0.0.0:8080
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
