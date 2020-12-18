package products
import (
	"fmt"
	// _ "github.com/jinzhu/gorm"
	"context"
	_"log"
	// "go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/mongo"
	"goApp/common"

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
	return err
}

//Obtener todos los Products
func GetAllProducts(data interface{}) error {
	//Define filter query for fetching specific document from collection
	// filter := bson.D{{}} //bson.D{{}} specifies 'all documents'
	// products := []Product{}
	fmt.Println("GETALL ======================")
	client, err := common.GetMongoClient()
	if err != nil {
		return err
	}
	collection := client.Database(common.DBmongo).Collection(common.PRODUCTS)
	_, err = collection.Find(context.TODO(), data)

	// //Map result to slice
	// for cur.Next(context.TODO()) {
	// 	t := Issue{}
	// 	err := cur.Decode(&t)
	// 	if err != nil {
	// 		return issues, err
	// 	}
	// 	issues = append(issues, t)
	// }
	// // once exhausted, close the cursor
	// cur.Close(context.TODO())
	// if len(issues) == 0 {
	// 	return issues, mongo.ErrNoDocuments
	// }
	// return issues, nil

	fmt.Println(err)
	if err != nil {
		return err
	}
	return err
}

// //Obtener todos los Products
// func GetAllProducts(data interface{}) error {
// 	db := common.GetDB()
// 	err := db.Find(data).Error
// 	return err
// }

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


