package products

import (
	// "fmt"
	"github.com/gin-gonic/gin"
	// "net/http"
)

func ProductsNoAuthed(router *gin.RouterGroup) {
	router.GET("/", ProductList)
	router.GET("/:slug", ProductBySlug)
}

func ProductsAuthed(router *gin.RouterGroup) {
	router.POST("/", ProductCreate)	
	router.PUT("/:slug", ProductUpdate)
	router.DELETE("/:slug", ProductDelete)
}

// func ProductsRoutes(router *gin.RouterGroup) {
// 	router.GET("/", ProductList)
// 	router.GET("/:slug", ProductBySlug)
// 	router.POST("/", ProductCreate)
// 	router.PUT("/:slug", ProductUpdate)
// 	router.DELETE("/:slug", ProductDelete)
// }