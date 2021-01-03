package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"goApp/common"
	// "github.com/zsais/go-gin-prometheus"
	"goApp/src"
	// "strings"
	// "net/http"
	// "github.com/prometheus/client_golang/prometheus/promhttp"
)

// func Migrate(db *gorm.DB) {
// 	products.AutoMigrate()
// }

func main() {
	// http.Handle("/metrics", promhttp.Handler())
	// http.ListenAndServe(":2112", nil)
	// http.HandleFunc("/", handler)
	db := common.Init()
	// Migrate(db)
	defer db.Close()
	r := gin.Default()
	// p := ginprometheus.NewPrometheus("gin")

	// p.ReqCntURLLabelMappingFn = func(c *gin.Context) string {
	// 	url := c.Request.URL.Path
	// 	for _, p := range c.Params {
	// 		if p.Key == "name" {
	// 			url = strings.Replace(url, p.Value, ":name", 1)
	// 			break
	// 		}
	// 	}
	// 	return url
	// }

	// p.Use(r)

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

	// http.Handle("/metrics", promhttp.Handler())
	// http.ListenAndServe(":2112", nil)

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
		// c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("Content-Type", "application/json")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		}
		c.Next()
	}
	r.Use(cors)
}
