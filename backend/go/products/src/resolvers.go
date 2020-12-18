package products
import (
	"fmt"
	_ "github.com/jinzhu/gorm"
	// "goApp/models"
	_ "strconv"
)

//Crear un product
func CreateProduct(data interface{}) error {
	db := common.GetDB()
	err := db.Create(data).Error
	return err
}

//Obtener todos los Products
func GetAllProducts(data interface{}) error {
	db := common.GetDB()
	err := db.Find(data).Error
	return err
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


