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

	//set filter to empty (all products)
	filter := bson.D{{}} 
	
	//if key dont empty set filters
	if key != ""{
		filter = bson.D{primitive.E{Key: key, Value: value}}	
	}

	//get products
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

    //Close the cursor once finished
    cur.Close(context.TODO())

	//return results and err
	return results,err

	
	// fmt.Println(cursor);
	
	// // return err

	// if err != nil { log.Fatal(err) }

	// defer cursor.Close(context.TODO())

	// var products []bson.M
	// if err = cursor.All(context.TODO(), &products); 
	// err != nil {
	// 	log.Fatal(err)
	// }

	// for cursor.Next(context.TODO()) {
	// 	t := Products{}
	// 	err := cursor.Decode(&t)
	// 	if err != nil {
	// 		return products, err
	// 	}
	// 	products = append(products, t)
	// }

//===========

	// var results []primitive.M
	// for cursor.Next(context.TODO()) {
	// 	var result bson.M
	// 	e := cursor.Decode(&result)
	// 	if e != nil {
	// 		log.Fatal(e)
	// 	}
	// 	// fmt.Println("cursor..&gt;", cursor, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
	// 	results = append(results, result)
	
	// }
	
	// if err := cursor.Err(); err != nil {
	// 	log.Fatal(err)
	// }
	
	// cursor.Close(context.TODO())
	



	// fmt.Println(products);
	
	// fmt.Println(err)


	// return err

//==============0


	// cur, err := collection.Find(context.TODO(), data)
	// cur, err := collection.Find(context.TODO(), bson.D{})
	// fmt.Println(cur);
	
	// if err != nil {
	// 	return err
	// }
	// fmt.Println(cur);
	// fmt.Println(products);
	
	// for cur.Next(context.TODO()) {

	// 	err := cur.Decode(&Products{})
	// 	if err != nil { log.Fatal(err) }
	// 	products = append(products, Products{})
	// }

	// cur.Close(context.TODO())

	// return err

	// cur, err := collection.Find(context.Background(), bson.D{})
	// if err != nil { log.Fatal(err) }
	// defer cur.Close(context.Background())
	// for cur.Next(context.Background()) {
	// // To decode into a struct, use cursor.Decode()
	// result := struct{
	// 	Foo string
	// 	Bar int32
	// }{}
	// err := cur.Decode(&result)

	// raw := cur.Current
	// }
	// if err := cur.Err(); err != nil {
	// return err

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


