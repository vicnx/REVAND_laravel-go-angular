package products

import (
	// "github.com/jinzhu/gorm"
	"goApp/common"
	// "go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

/*
POST http://go_products.docker.localhost/api/products

{
    "name":"test",
    "description": "test_desc",
    "images": null,
    "price": "55555",
    "authorID": 1
}

*/

type Products struct {
	// ID       primitive.ObjectID `bson:"_id"`
	Name    	string 			`bson:"name, omitempty"`
	Description	string 			`bson:"description, omitempty"`
	Images		[]string 		`bson:"images, omitempty"`
	Price 		string 			`bson:"price, omitempty"`
	AuthorID    uint 			`bson:"authorid, omitempty"`
}

func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&Products{})
}