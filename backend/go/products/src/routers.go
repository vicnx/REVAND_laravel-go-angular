package products

import (
	// "fmt"
	"github.com/gin-gonic/gin"
	// "net/http"
)

// func ProductsNoAuthed(router *gin.RouterGroup) {
// 	router.GET("/", ProductList)
// 	router.GET("/:id", ProductByID)
// }

// func ProductsAuthed(router *gin.RouterGroup) {
// 	router.POST("/", ProductCreate)
// 	router.PUT("/:id", ProductUpdate)
// 	router.DELETE("/:id", ProductDelete)
// 	router.DELETE("/", ProductDeleteAll)
// }

func ProductsRoutes(router *gin.RouterGroup) {
	router.GET("/", ProductList)
	router.GET("/:slug", ProductBySlug)
	router.POST("/", ProductCreate)
	router.PUT("/:slug", ProductUpdate)
	router.DELETE("/:slug", ProductDelete)
}