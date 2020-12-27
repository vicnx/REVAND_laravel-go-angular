package products

import (
	// "github.com/dgrijalva/jwt-go"
	// "github.com/dgrijalva/jwt-go/request"
	// "goApp/common"
	// "github.com/imroc/req"
	"github.com/gin-gonic/gin"
	"net/http"
	// "github.com/go-ping/ping"
	// "net"
	// "bufio"
	"strings"
	"fmt"
	// "io/ioutil"
	// "time"

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


	

	// r, err := req.Get("http://go_redis.docker.localhost/api/redis/data/user_jowiwi")
	// fmt.Println(r)
	// fmt.Println(err)
	
	

	// url := "http://go_redis.docker.localhost/api/redis/data/user_"+username

	// conn, err := net.Dial("tcp", "http://go_redis.docker.localhost/api/redis/data/user_"+username)
	// if err != nil {
	// 	// handle error
	// }
	// fmt.Fprintf(conn, "GET / HTTP/1.0\r\n\r\n")
	// status, err := bufio.NewReader(conn).ReadString('\n')
	// fmt.Println(status)
	// fmt.Println(err)
	
	
	
	// resp, err := http.Get(string("http://go_redis.docker.localhost/api/redis/data/user_"+username))
	// fmt.Println("print responses ======")
	// fmt.Println(err)
	// fmt.Println(resp)
	
	
	
    // if err != nil {
    //     print(err)
    // }
   
    // defer resp.Body.Close()
    // body, err := ioutil.ReadAll(resp.Body)
    // if err != nil {
    //     print(err)
    // }
    
    // fmt.Print(string(body))




	// redis_token, err := http.Get("http://go_redis.docker.localhost/api/redis/data/user_"+username);
	// if err != nil {
	// 		fmt.Println(err)
				
	// }
	fmt.Println(token)
	// fmt.Println(err)
	// fmt.Println(redis_token)
	// defer redis_token.Body.Close()

	



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
