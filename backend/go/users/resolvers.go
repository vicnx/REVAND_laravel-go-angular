package users
import (
	"errors"
	_ "github.com/jinzhu/gorm"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"
	"golang.org/x/crypto/bcrypt"
)

//Save user
func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

func FindOneUser(condition interface{}) (Users, error) {
	db := common.GetDB()
	var model Users
	err := db.Where(condition).First(&model).Error
	return model, err
}

func (u *Users) checkPassword(password string) error {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(u.PasswordHash)
	return bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
}

func (model *Users) Update(data interface{}) error {
	db := common.GetDB()
	err := db.Model(model).Update(data).Error
	return err
}
func (u *Users) setPassword(password string) error {
	if len(password) == 0 {
		return errors.New("password should not be empty!")
	}
	bytePassword := []byte(password)
	// Make sure the second param `bcrypt generator cost` between [4, 32)
	passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	u.PasswordHash = string(passwordHash)
	return nil
}

