package awards
import (
	"fmt"
	_ "github.com/jinzhu/gorm"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"
	_ "strconv"
)

//Crear un award
func CreateAward(data interface{}) error {
	db := common.GetDB()
	err := db.Create(data).Error
	return err
}

//Obtener todos los Awards
func GetAllAwards(data interface{}) error {
	fmt.Println(data)
	db := common.GetDB()
	err := db.Find(data).Error
	return err
}

//update award
func UpdateAward(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

//delete award
func DeleteAward(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).Delete(data).Error
	return err
}


func DeleteAllAwards(data interface{}) error {
	db := common.GetDB()
	err := db.Exec(`TRUNCATE TABLE awards`).Error
	return err
}


//get award by ID
func GetAwardByID(data, id interface{}) error {
	db := common.GetDB()
	err := db.Where("id = ?", id).First(data).Error
	return err
}


