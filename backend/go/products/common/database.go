package common

import (
	"fmt"
    "context"
	"log"
	"sync"
	// "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB
var collection *mongo.Collection
var ctx = context.TODO()

type Trainer struct {
	Name string
	Age  int
	City string
}


var clientInstance *mongo.Client
var clientInstanceError error
var mongoOnce sync.Once

const (
	CONNECTIONSTRING	= "mongodb://mongo/"
	DBmongo				= "revand"
	PRODUCTS			= "products"
)

func GetMongoClient() (*mongo.Client, error) {
	mongoOnce.Do(func() {
		clientOptions := options.Client().ApplyURI(CONNECTIONSTRING)
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			clientInstanceError = err
		}
		// Check the connection
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			clientInstanceError = err
		}
		clientInstance = client
	})
	return clientInstance, clientInstanceError
}

func Init() *gorm.DB {
	// // Init Mongodb 
	// clientOptions := options.Client().ApplyURI("mongodb://mongo/")
	// client, err := mongo.Connect(ctx, clientOptions)
	// if err != nil {
	// 	log.Fatal("Could not connect to MongoDB:", err)
	// }

	// if err = client.Ping(ctx, nil); err != nil {
	// 	log.Fatal("Failed to ping MongoDB:", err)
	// }

	// log.Println("Connected to MongoDB!")

	// // =============================================

	// // Get a handle for your collection
	// collection := client.Database("revand").Collection("trainers")

	// // Some dummy data to add to the Database
	// ash := Trainer{"Ash", 10, "Pallet Town"}

	// // Insert a single document
	// insertResult, err := collection.InsertOne(context.TODO(), ash)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("Inserted a single document: ", insertResult.InsertedID)

	// // Insert multiple documents
	// trainers := []interface{}{misty, brock}

	// insertManyResult, err := collection.InsertMany(context.TODO(), trainers)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("Inserted multiple documents: ", insertManyResult.InsertedIDs)



	// ===================================================

	// Init mysql
	db, err := gorm.Open("mysql", DbURL(BuildDBConfig()))
	if err != nil {
		fmt.Println("db err: ", err)
	}
	db.DB().SetMaxIdleConns(10)
	db.LogMode(true)
	DB = db
	return DB
}

// DBConfig represents db configuration
type DBConfig struct {
	Host     string
	Port     int
	User     string
	DBName   string
	Password string
}

func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     "mysql",
		Port:     3306,
		User:     "vicnx",
		Password: "12345678",
		DBName:   "revand",
	}
	// fmt.Println(&dbConfig)
	return &dbConfig
}

func DbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
	)
}

func GetDB() *gorm.DB {
	return DB
}

func GetMongoDB() *mongo.Collection {
	return collection
}

func connect() *mongo.Client {
 
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {

		log.Fatal(err)

	}

	err = client.Ping(ctx, nil)

	if err != nil {

		log.Fatal(err)

	}

	fmt.Println("Connected to MongoDB!")

	return client
   
}