package products

import (
	"github.com/jinzhu/gorm"
	"goApp/common"
)

type Product struct {
	ID     primitive.ObjectID 	`bson:"_id,omitempty"`
	Name    	string 			`bson:"name, omitempty"`
	Description	string 			`bson:"description, omitempty"`
	Images		[]string 		`bson:"images, omitempty"`
	Price 		string 			`bson:"price, omitempty"`
	AuthorID    uint 			`bson:"authorid, omitempty"`
}

func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&Product{})
}