package products

import (
	// "github.com/dgrijalva/jwt-go"
	// "github.com/dgrijalva/jwt-go/request"
	// "goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"fmt"

)

//http://go_redis.docker.localhost/api

func checkUser(c *gin.Context) bool{
fmt.Println("CHEEECKUSER ======================")

	token:=getTokenFromHeaders(c)
	username:=getUsernameFromHeaders(c)

	if username == "undefined" {
		c.AbortWithStatus(http.StatusUnauthorized)
		return false
	}

	redis_token, err := http.Get("http://go_redis.docker.localhost/api/redis/data/user_"+username);
	if err != nil {
			fmt.Println(err)
				
	}
	fmt.Println(token)
	fmt.Println(err)
	fmt.Println(redis_token)
	defer redis_token.Body.Close()



	// if redis_token == token{
	// 	return true
	// }
	return false
}

func getTokenFromHeaders(c *gin.Context) string {
	token := c.Request.Header["Authorization"];
	stripped:=stripBearerPrefixFromTokenString(token[0]);
	return stripped
}

func getUsernameFromHeaders(c *gin.Context) string {
	username := c.Request.Header["Username"];
	return username[0]
}

func stripBearerPrefixFromTokenString(tok string) (string) {
	if len(tok) > 5 && strings.ToUpper(tok[0:7]) == "BEARER " {
		return tok[7:]
	}
	return tok
}
