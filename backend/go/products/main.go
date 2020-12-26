package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	// "github.com/jinzhu/gorm"
	"goApp/common"
	"goApp/src"
	// "net/http"
	// "strings"
)

// func Migrate(db *gorm.DB) {
// 	products.AutoMigrate()
// }

func main() {
	// http.HandleFunc("/", handler)
	db := common.Init()
	// Migrate(db)
	defer db.Close()
	r := gin.Default()
	MakeRoutes(r)
	v1 := r.Group("/api")

	// test:=VerifyToken(r);
	// fmt.Println(test)
	
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


// func handler(w http.ResponseWriter, r *http.Request) {
//     fmt.Fprintf(w, "%s %s %s \n", r.Method, r.URL, r.Proto)
//     //Iterate over all header fields
//     for k, v := range r.Header {
//         fmt.Fprintf(w, "Header field %q, Value %q\n", k, v)
//     }

//     fmt.Fprintf(w, "Host = %q\n", r.Host)
//     fmt.Fprintf(w, "RemoteAddr= %q\n", r.RemoteAddr)
//     //Get value for a specified token
//     fmt.Fprintf(w, "\n\nFinding value of \"Accept\" %q", r.Header["Accept"])
// }

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
