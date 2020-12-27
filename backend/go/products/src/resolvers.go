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
	"reflect"
	"github.com/gosimple/slug"
	// "time"
	"strconv"
	"math/rand"

	_ "strconv"
)


func CreateProduct(data interface{}) error {
	field := reflect.ValueOf(data).Elem().FieldByName("Name").Interface()
	str := fmt.Sprintf("%v", field)
	text := slug.Make(str+strconv.Itoa(rand.Intn(9999 - 0) + 0))

	reflect.ValueOf(data).Elem().FieldByName("Slug").SetString(text)

	client, err := common.GetMongoClient()
	if err != nil {
		return err
	}
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	_, err = collection.InsertOne(context.TODO(), data)
	if err != nil {
		return err
	}
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
	fmt.Println(results)
	
	cur.Close(context.TODO())
	
	return results,err
}



// func GetProductsByCode(code string) (Issue, error) {
// 	result := Issue{}
// 	//Define filter query for fetching specific document from collection
// 	filter := bson.D{primitive.E{Key: "code", Value: code}}
// 	//Get MongoDB connection using connectionhelper.
// 	client, err := connectionhelper.GetMongoClient()
// 	if err != nil {
// 		return result, err
// 	}
// 	//Create a handle to the respective collection in the database.
// 	collection := client.Database(connectionhelper.DB).Collection(connectionhelper.ISSUES)
// 	//Perform FindOne operation & validate against the error.
// 	err = collection.FindOne(context.TODO(), filter).Decode(&result)
// 	if err != nil {
// 		return result, err
// 	}
// 	//Return result without any error.
// 	return result, nil
// }


func GetProductBySlug(slug string) (Products,error) {
	result := Products{}
	client, err := common.GetMongoClient()
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	
	filter := bson.D{primitive.E{Key: "slug", Value: slug}}	

	err = collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil { return result, err }

	return result, nil


	// WORKS =================

	// cur, err := collection.Find(context.TODO(), filter )
	// if err != nil { log.Fatal(err) }
	// var results []Products

	// for cur.Next(context.TODO()) {
	// 	var elem Products
	// 	err := cur.Decode(&elem)
	// 	if err != nil { log.Fatal(err) }
	// 	results =append(results, elem)
	// }

    // if err := cur.Err(); err != nil {
    //     log.Fatal(err)
	// }
	// fmt.Println(results)
	
	// cur.Close(context.TODO())
	
	// return results,err
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
// func GetProductBySlug(data, slug interface{}) error {
// 	db := common.GetDB()
// 	err := db.Where("id = ?", id).First(data).Error
// 	return err
// }


