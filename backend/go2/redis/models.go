package redis

import (
	"fmt"
	"github.com/go-redis/redis/v8"
	"context"
	"reflect"
)

var ctx = context.Background()

//estructura de datos guardados, clave-valor
type Info struct {
	Key   	string 	`json:"key"   	binding:"required"`
	Value 	string 	`json:"value" 	binding:"required"`
}

//creamos el cliente redis
func NewClient() *redis.Client {
	
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
	return client
}

// type Dataa struct {
// 	Key   string `json:"key"   binding:"required"`
// 	Value string `json:"value" binding:"required"`
// }

//guardar
func Set(key string, value string, client *redis.Client) error {
	fmt.Println("MANGO")
	fmt.Println(context.Background())
	

	err := client.Set(ctx, key, value, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

//obtener
func Get(key string, client *redis.Client) (error, string) {
	val, err := client.Get(ctx, key).Result()
	return err, val
}

func Ping(client *redis.Client) error {
	pong, err := client.Ping(ctx).Result()
	if err != nil {
		return err
	}
	fmt.Println(pong, err)
	// Output: PONG <nil>

	return nil
}

func GetAll(client *redis.Client) map[string]string {
	var keys2 map[string]string
	keys2 = make(map[string]string)

	keys, _ := client.Do(ctx, "KEYS", "*").Result()
	/*if err != nil {
		// fmt.Println("error in KEYS ---------------")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}*/
	// get values of the keys
	for i := 0; i < reflect.ValueOf(keys).Len(); i++ {
		key := fmt.Sprintf("%v", reflect.ValueOf(keys).Index(i)) // convert from interface to string

		_, val := Get(key, client) // gets the value
		/*if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}*/
		keys2[key] = val
	}
	return keys2
}