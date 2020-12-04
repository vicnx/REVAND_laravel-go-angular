package redis

import (
	"github.com/go-redis/redis/v8"
)

//estructura de datos guardados, clave-valor
type Info struct {
	Key   string `json:"key"   binding:"required"`
	Value string `json:"value" binding:"required"`
}

//creamos el cliente redis
func newClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
	return client
}

//guardar
func set(key string, value string, client *redis.Client) error {
	err := client.Set(key, value, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

//obtener
func get(key string, client *redis.Client) (error, string) {
	val, err := client.Get(key).Result()
	return err, val
}
