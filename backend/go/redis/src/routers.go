package redis

import (
	"fmt"
	"net/http"

	//"reflect"

	"github.com/gin-gonic/gin"
	//"github.com/go-redis/redis"
	"strings"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.GET("/", getAll)
	router.GET("/data/:key", getData)
	router.POST("/", setData)
	router.GET("/users", getUsers)
}

func getData(c *gin.Context) {
	client := NewClient()

	key := c.Param("key")

	err, val := Get(key, client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{key: val})

}

func setData(c *gin.Context) {
	client := NewClient()

	var data Info
	// if error in input json
	// if err := c.ShouldBindJSON(&data); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// Parse POST data
	c.BindJSON(&data)

	err := Set(data.Key, data.Value, client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"operation": "successfully"})
	// fmt.Printf("%+v\n", data)
}

func getAll(c *gin.Context) {
	fmt.Printf("MANGO GET ALL")
	client := NewClient()
	keys := GetAll(client)
	c.JSON(200, gin.H{"keys": keys})
}

func getUsers(c *gin.Context) {
	fmt.Printf("MANGO GET USERS")

	client := NewClient()
	keys := GetAll(client)
	var users []Info
	for key, value := range keys {
		if (strings.HasPrefix(key, "user_")) {
			key = trimLeftChars(key, 4)
			users = append(users, Info{Key: key, Value: value})
		}
	}
	c.JSON(200,	gin.H{"users":users})
}

func trimLeftChars(s string, n int) string {
    for i := range s {
        if i > n {
            return s[i:]
        }
    }
    return s[:0]
}