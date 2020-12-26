package products

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Filter struct {
	key		string
	value	string 	
}

func ProductList(c *gin.Context) {

	check:=checkUser(c)
	fmt.Println(check)
	
	
	// check:= CheckCurrentUser("mangomango")
	// fmt.Println(check)
	// token := c.Request.Header["Authorization"];
	
	
	
	// GET QUERY PARAMS (KEY AND VALUE)
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

func ProductByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var product Products
	err := GetProductByID(&product, id)
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"product": product})
		// c.JSON(http.StatusOK, product)
		return
	}
}

func ProductUpdate(c *gin.Context) {
	var product Products
	id := c.Params.ByName("id")
	err := GetProductByID(&product, id) //te llena &product (si lo encuentra pone err a nil (la instancia))
	if err != nil { //si no esta instanciada
		fmt.Println("err no es nil")
		c.JSON(http.StatusNotFound, "NOT FOUND") // envia al cliente un JSON
	}else{ //si esta instanciada hace el update
		c.BindJSON(&product) // recoge los nuevos datos del cliente y los guarda en &product
		fmt.Println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
		fmt.Println(product)
		err = UpdateProduct(&product) // guardamos los nuevos datos
		if err != nil {
			c.JSON(http.StatusOK, "Not found")
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, gin.H{"product": product})
			return
		}
	}
}

func ProductCreate(c *gin.Context) {

	// token:=getTokenFromHeaders(c)
	// username:=getUsernameFromHeaders(c)
	// if username == "undefined" {
	// 	c.AbortWithStatus(http.StatusUnauthorized)
	// 	return
	// }
	// fmt.Println(username)
	// fmt.Println(token)

	

	var product Products
	c.BindJSON(&product);
	err := CreateProduct(&product)
	fmt.Println(product);
	
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"product": product})
		
		return
	}
}

func ProductDelete(c *gin.Context) {
	var product Products
	id := c.Params.ByName("id")
	err := DeleteProduct(&product,id)
	if err != nil {
		// c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id: " + id: "is deleted"})
	}
}

func ProductDeleteAll(c *gin.Context) {
	var product Products
	err := DeleteAllProducts(&product)
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		// c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, "Truncate product")
	}
}
