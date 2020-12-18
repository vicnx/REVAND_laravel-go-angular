package products

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ProductList(c *gin.Context) {
	var product []Products
	err := GetAllProducts(&product)
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, product)
		
	}
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
	var product Products
	c.BindJSON(&product);
	err := CreateProduct(&product)
	if err != nil {
		// c.JSON(http.StatusOK, "Not found")
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
