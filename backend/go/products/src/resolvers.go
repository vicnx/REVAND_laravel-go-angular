package products
import (
	"fmt"
	// _ "github.com/jinzhu/gorm"
	"context"
	"log"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/mongo"
	"goApp/common"
	// "net/http"

	_ "strconv"
)


func CreateProduct(data interface{}) error {
	client, err := common.GetMongoClient()
	if err != nil {
		return err
	}
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	_, err = collection.InsertOne(context.TODO(), data)
	if err != nil {
		return err
	}
	fmt.Println(err);
	return err
}

//Obtener todos los Products
func GetAllProducts(key string,value string) ([]Products,error) {

	client, err := common.GetMongoClient()
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)

	filter := bson.D{{}} 
	
	if key != ""{
		filter = bson.D{primitive.E{Key: key, Value: value}}	
	}

	cur, err := collection.Find(context.TODO(), filter)
	if err != nil { log.Fatal(err) }
	var results []Products

	for cur.Next(context.TODO()) {
		var elem Products
		err := cur.Decode(&elem)
		if err != nil { log.Fatal(err) }
		results =append(results, elem)
	}

    if err := cur.Err(); err != nil {
        log.Fatal(err)
	}
	
	cur.Close(context.TODO())
	
	return results,err
}

//update product
func UpdateProduct(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

//delete product
func DeleteProduct(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}


func DeleteAllProducts(data interface{}) error {
	db := common.GetDB()
	err := db.Exec(`TRUNCATE TABLE products`).Error
	return err
}


//get product by ID
func GetProductByID(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).First(data).Error
	return err
}


