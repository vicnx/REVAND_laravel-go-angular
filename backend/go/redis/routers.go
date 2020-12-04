// package redis

// import (
// 	"fmt"
// 	"net/http"	

// 	"reflect"

// 	"github.com/gin-gonic/gin"
// )

// func Routers(router *gin.RouterGroup) {
// 	router.GET("/", getAll)
// 	router.GET("/:key", getOne)
// 	router.POST("/", save)
// 	router.DELETE("/:key", delete)
// }

// //obtenemos todos los libros favoritos
// func getAll(c *gin.Context) {

// 	client := newClient()
// 	var array map[string]string
// 	array = make(map[string]string)

// 	keys, err := client.Do("KEYS", "*").Result()
// 	//si error
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	}
// 	//obtenemos los valores de las claves
// 	for i := 0; i < reflect.ValueOf(keys).Len(); i++ {
// 		key := fmt.Sprintf("%v", reflect.ValueOf(keys).Index(i)) // convert from interface to string

// 		err, val := get(key, client)
// 		if err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		}
// 		array[key] = val
// 	}
// 	c.JSON(200, gin.H{"keys": array})
// }

// //obtenemos un libro favorito, especificando la clave
// func getOne(c *gin.Context) {
// 	client := newClient()

// 	key := c.Param("key")

// 	err, val := get(key, client)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(200, gin.H{key: val})

// }

// //borramos un libro favorito
// func delete(c *gin.Context) {
// 	//creamos el cliente
// 	client := newClient()
// 	//le pasamos la clave
// 	key := c.Param("key")
// 	//borramos la clave
// 	n, err := client.Del(key).Result()
// 	//si error
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	//si ok, mostramos un mensaje
// 	c.JSON(200, gin.H{"result": n})

// }

// //guardamos los libros favoritos
// func save(c *gin.Context) {
// 	client := newClient()

// 	var info Info
// 	if err := c.ShouldBindJSON(&info); err != nil { //marca error, pero funciona
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	//pasamos los datos a json
// 	c.BindJSON(&info)

// 	//si error
// 	err := set(info.Key, info.Value, client)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	//si se guardan los datos correctamente
// 	c.JSON(200, gin.H{"result": "ok"})
// }
