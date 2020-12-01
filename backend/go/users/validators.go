package users

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"
)

// *ModelValidator containing two parts:
// - Validator: write the form/json checking rule according to the doc https://github.com/go-playground/validator
// - DataModel: fill with data from Validator after invoking common.Bind(c, self)
// Then, you can just call model.save() after the data is ready in DataModel.
type UsersValidator struct {
	User struct {
		Username string `form:"username" json:"username" binding:"exists,alphanum,min=4,max=255"`
		Email    string `form:"email" json:"email" binding:"exists,email"`
		Password string `form:"password" json:"password" binding:"exists,min=8,max=255"`
		Bio      string `form:"bio" json:"bio" binding:"max=1024"`
		Image    string `form:"image" json:"image" binding:"omitempty,url"`
		Provider string `form:"provider" json:"provider"`
		Type 	 string `form:"type" json:"type"`
	} `json:"user"`
	Users Users `json:"-"`
}

// There are some difference when you create or update a model, you need to fill the DataModel before
// update so that you can use your origin data to cheat the validator.
// BTW, you can put your general binding logic here such as setting password.
func (self *UsersValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		return err
	}
	self.Users.Username = self.User.Username
	self.Users.Email = self.User.Email
	self.Users.Bio = self.User.Bio
	self.Users.Provider = "local"
	self.Users.Type = "client"
	fmt.Println(self)


	if self.User.Password != common.NBRandomPassword {
		self.Users.setPassword(self.User.Password)
	}
	if self.User.Image != "" {
		self.Users.Image = &self.User.Image
	}
	if self.User.Bio == "" {
		self.Users.Bio = "Hola soy el pepe"
	}
	return nil
}

// You can put the default value of a Validator here
func NewUsersValidator() UsersValidator {
	UsersValidator := UsersValidator{}
	//UsersValidator.User.Email ="w@g.cn"
	return UsersValidator
}

func NewUsersValidatorFillWith(Users Users) UsersValidator {
	UsersValidator := NewUsersValidator()
	UsersValidator.User.Username = Users.Username
	UsersValidator.User.Email = Users.Email
	UsersValidator.User.Bio = Users.Bio
	UsersValidator.User.Password = common.NBRandomPassword

	if Users.Image != nil {
		UsersValidator.User.Image = *Users.Image
	}
	return UsersValidator
}

type LoginValidator struct {
	User struct {
		Email    string `form:"email" json:"email" binding:"exists,email"`
		Password string `form:"password"json:"password" binding:"exists,min=8,max=255"`
	} `json:"user"`
	Users Users `json:"-"`
}

func (self *LoginValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		return err
	}

	self.Users.Email = self.User.Email
	return nil
}

// You can put the default value of a Validator here
func NewLoginValidator() LoginValidator {
	loginValidator := LoginValidator{}
	return loginValidator
}
