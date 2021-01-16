package products

import (
	"goApp/common"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Slug		string 			`bson:"slug, omitempty"`
	Name    	string 			`bson:"name, omitempty"`
	Description	string 			`bson:"description, omitempty"`
	Images		[]string 		`bson:"images, omitempty"`
	Price 		int 			`bson:"price, omitempty"`
	AuthorID    uint 			`bson:"authorid, omitempty"`
	Visits		int 			`bson:"visits, omitempty"`
}

type User struct {
	ID           uint    `gorm:"primary_key"`
	Username     string  `gorm:"column:username"`
	Email        string  `gorm:"column:email;unique_index"`
	Bio          string  `gorm:"column:bio;size:1024"`
	Image        *string `gorm:"column:image"`
	Provider     string  `gorm:"column:provider"`
	Type     	 string  `gorm:"column:type"`
	PasswordHash string  `gorm:"column:password;not null"`
}

func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&Products{})
}