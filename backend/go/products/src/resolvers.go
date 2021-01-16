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
	// Get field name
	field := reflect.ValueOf(data).Elem().FieldByName("Name").Interface()
	str := fmt.Sprintf("%v", field)
	// Crear slug a partir del nombre del producto y un numero rand (bici-electrica-8741)
	text := slug.Make(str+strconv.Itoa(rand.Intn(9999 - 0) + 0))

	// Aplicar el nuevo slug
	reflect.ValueOf(data).Elem().FieldByName("Slug").SetString(text)

	client, err := common.GetMongoClient()
	if err != nil {
		return err
	}
	// Insertar producto a bbdd 
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

	fmt.Println("======================================");
	fmt.Println(value);
	
	fmt.Println(key);
 
	if key != ""{
		var authId uint64
		if key == "authorid" {
			authId2, _ := strconv.ParseUint(value, 10, 32)
			authId = authId2;
		}
		

		filter = bson.D{primitive.E{Key: key, Value: authId}}	
		fmt.Println(filter);
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

func UpdateProduct(slug string, product Products) (bool,error) {
	_,check:=GetProductBySlug(slug)
	if check != nil { return false, check }

	client, err := common.GetMongoClient()
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	
	filter := bson.D{primitive.E{Key: "slug", Value: slug}}	
	update := bson.M{"$set": product}


	_, err = collection.UpdateOne(context.Background(),filter,update)
	
	if err != nil { return false, err }

	return true, nil
}



//update product
// func UpdateProduct(data interface{}) error {
// 	db := common.GetDB()
// 	err := db.Save(data).Error
// 	return err
// }

//delete product
func DeleteProduct(slug string) error {
	// result := Products{}
	client, err := common.GetMongoClient()
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	
	// filter := bson.D{primitive.E{Key: "slug", Value: slug}}	
	deleteResult, _ := collection.DeleteOne(context.TODO(), bson.M{"slug": slug})
	fmt.Println(deleteResult);
	// err = collection.Remove(bson.M{"slug": slug})
	if err != nil { return err }

	return nil
}


// Statistics functions

func CountProducts() (int64,error) {

	client, err := common.GetMongoClient()

	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)

	res, err := collection.CountDocuments(context.TODO(), bson.D{{}}, )	
	
	if err != nil { return res,err }

	return res,err
}

func IncrementProductVisit(slug string) error {
	// result := Products{}
	client, err := common.GetMongoClient()
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	
	res , err := collection.UpdateOne(context.TODO(), bson.D{
		primitive.E{Key: "slug", Value: slug}}, 
		bson.D{
			{"$inc", bson.D{{"visits", 1}}},
		})
	fmt.Println(res)

	if err != nil { return err }

	return nil
}
