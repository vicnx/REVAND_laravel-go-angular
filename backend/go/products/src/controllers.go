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

// func Keys(m map[int]interface{}) []int {
//     keys := make([]int, len(m))
//     i := 0
//     for k := range m {
//         keys[i] = k
//         i++
//     }
//     return keys
// }

func ProductList(c *gin.Context) {
	
	// GET QUERY PARAMS (KEY AND VALUE)
	// var key string
	// var value []string

	fmt.Println(c.Request.URL.Query())
	// if val, err := c.Request.URL.Query()["authorid"]; err {
	// 	key = "authorid";
	// 	value = c.Request.URL.Query()["authorid"];
	// }else{
	// 	key = c.Request.URL.Query().Get("key")
	// 	value = c.Query("value")
	// }
	
	key := c.Request.URL.Query().Get("key")
	value := c.Query("value")

	fmt.Println("KEEEEEEEY")
	fmt.Println(key)
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

	result,err := GetProductBySlug(slug)
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, result)
		return
	}
}

// func ProductUpdate(c *gin.Context) {
// 	var product Products
// 	id := c.Params.ByName("id")
// 	err := GetProductByID(&product, id) //te llena &product (si lo encuentra pone err a nil (la instancia))
// 	if err != nil { //si no esta instanciada
// 		fmt.Println("err no es nil")
// 		c.JSON(http.StatusNotFound, "NOT FOUND") // envia al cliente un JSON
// 	}else{ //si esta instanciada hace el update
// 		c.BindJSON(&product) // recoge los nuevos datos del cliente y los guarda en &product
// 		fmt.Println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
// 		fmt.Println(product)
// 		err = UpdateProduct(&product) // guardamos los nuevos datos
// 		if err != nil {
// 			c.JSON(http.StatusOK, "Not found")
// 			c.AbortWithStatus(http.StatusNotFound)
// 		} else {
// 			c.JSON(http.StatusOK, gin.H{"product": product})
// 			return
// 		}
// 	}
// }

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


