package products

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"goApp/common"
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

var MyAuth2Extractor = &request.MultiExtractor{
	AuthorizationHeaderExtractor,
	request.ArgumentExtractor{"access_token"},
}
var AuthorizationHeaderExtractor = &request.PostExtractionFilter{
	request.HeaderExtractor{"Authorization"},
	stripBearerPrefixFromTokenString,
}

//to save SESSIOn
func UpdateContextUser(c *gin.Context, my_user_id uint) {
	var myUserModel User
	if my_user_id != 0 {
		db := common.GetDB()
		db.First(&myUserModel, my_user_id)
	}
	c.Set("my_user_id", my_user_id)
	c.Set("my_user_model", myUserModel)
}
func checkUser(c *gin.Context) bool{

	// token:=getTokenFromHeaders(c)
	username:=getUsernameFromHeaders(c)
	token, err := request.ParseFromRequest(c.Request, MyAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
		b := ([]byte(common.NBSecretPassword))
		return b, nil
	})
	fmt.Println(token)
	fmt.Println(err)
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		my_user_id := uint(claims["id"].(float64))
		// fmt.Println(my_user_id,claims["id"])
		UpdateContextUser(c, my_user_id)
	}

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
	// fmt.Println(token)
	// fmt.Println(err)
	// fmt.Println(redis_token)
	// defer redis_token.Body.Close()

	



	// if redis_token == token{
	// 	return true
	// }
	return false
}

func getTokenFromHeaders(c *gin.Context) (string,error) {
	token := c.Request.Header["Authorization"];
	stripped,err:=stripBearerPrefixFromTokenString(token[0]);
	return stripped,err
}

func getUsernameFromHeaders(c *gin.Context) string {
	username := c.Request.Header["Username"];
	return username[0]
}

// func stripBearerPrefixFromTokenString(tok string) (string) {
// 	if len(tok) > 5 && strings.ToUpper(tok[0:7]) == "BEARER " {
// 		return tok[7:]
// 	}
// 	return tok
// }
func stripBearerPrefixFromTokenString(tok string) (string, error) {
	// Should be a bearer token
	if len(tok) > 5 && strings.ToUpper(tok[0:7]) == "BEARER " {
		return tok[7:], nil
	}
	return tok, nil
}

//activar el login o no
func AuthMiddleware(auto401 bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		UpdateContextUser(c, 0)
		token, err := request.ParseFromRequest(c.Request, MyAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
			b := ([]byte(common.NBSecretPassword))
			return b, nil
		})
		if err != nil {
			if auto401 {
				c.AbortWithError(http.StatusUnauthorized, err)
			}
			return
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			my_user_id := uint(claims["id"].(float64))
			//fmt.Println(my_user_id,claims["id"])
			UpdateContextUser(c, my_user_id)
		}
	}
}