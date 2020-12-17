package common

import (
	"fmt"
    "context"
    "log"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB
var collection *mongo.Collection
var ctx = context.TODO()

func Init() *gorm.DB {

	// Init mongodb
	// clientOptions := options.Client().ApplyURI("mongodb://mongo:27017/?connect=direct")
	clientOptions := options.Client().ApplyURI("mongodb://mongo/")

	// clientOptions := options.Client().ApplyURI("mongodb://mongo:27017/").
	// 	SetAuth(options.Credential{
	// 		AuthSource: "revand", Username: "jowi", Password: "12345678",
	// 	})
	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}

	if err = client.Ping(ctx, nil); err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	log.Println("Connected to MongoDB!")
	collection := client.Database("revand").Collection("pages")
	fmt.Println(collection)
	fmt.Println("MONGOOOOOO MANGO ====================================")
	fmt.Println(err)


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