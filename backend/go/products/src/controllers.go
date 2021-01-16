package products

import (
	"fmt"
	"github.com/gin-gonic/gin"
	// "github.com/gosimple/slug"
	"net/http"
	// "reflect"
)

type Filter struct {
	key		string
	value	string 	
}

func ProductList(c *gin.Context) {
	
	fmt.Println(c.Request.URL.Query())
	
	key := c.Request.URL.Query().Get("key")
	value := c.Query("value")

	//send key anb value and save on results
	results,err := GetAllProducts(key,value)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"products": results})
	}
	return
}


// GET http://go_products.docker.localhost/api/products/slug-definitvo6842

func ProductBySlug(c *gin.Context) {
	slug := c.Param("slug")

	err := IncrementProductVisit(slug)

	result,err := GetProductBySlug(slug)
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, result)
		return
	}
}

func ProductCreate(c *gin.Context) {

	var product Products
	c.BindJSON(&product);
	//se obtiene el id del usuario actualmente logeado en GO (se logea por el middleware)
	userid := c.MustGet("my_user_id").(uint)
	product.AuthorID = userid;

	err := CreateProduct(&product)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"product": product})
		return
	}
}

func ProductUpdate(c *gin.Context) {
	slug := c.Param("slug")
	var product Products

	c.BindJSON(&product);
	product.Slug = slug
	_,err := UpdateProduct(slug,product)
	
	if err != nil {
		c.JSON(http.StatusNotFound, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"product": product})
		return
	}
	return
}

func ProductDelete(c *gin.Context) {
	slug := c.Params.ByName("slug")
	err := DeleteProduct(slug)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"slug: " + slug: "is deleted"})
	}
}


// Statistics products

func ProductCount(c *gin.Context) {
		result,err := CountProducts()

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, result)
	}
	return
}