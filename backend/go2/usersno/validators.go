package users

import (
	"goApp/common"
	"github.com/gin-gonic/gin"
	// "goApp/serializers"
)

// *ModelValidator containing two parts:
// - Validator: write the form/json checking rule according to the doc https://github.com/go-playground/validator
// - DataModel: fill with data from Validator after invoking common.Bind(c, self)
// Then, you can just call model.save() after the data is ready in DataModel.
type UserValidator struct {
	User struct {
		Username string `form:"username" json:"username" binding:"required,alphanum,min=4,max=255"`
		Email    string `form:"email" json:"email" binding:"required,email"`
		Password string `form:"password" json:"password" binding:"required,min=8,max=255"`
		Bio      string `form:"bio" json:"bio" binding:"max=1024"`
		Image    string `form:"image" json:"image" binding:"omitempty,url"`
		Provider string `form:"provider" json:"provider"`
		Type 	 string `form:"type" json:"type"`
	} `json:"user"`
	UserModel User `json:"-"`
}

// There are some difference when you create or update a model, you need to fill the DataModel before
// update so that you can use your origin data to cheat the validator.
// BTW, you can put your general binding logic here such as setting password.
func (self *UserValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		return err
	}
	self.UserModel.Username = self.User.Username
	self.UserModel.Email = self.User.Email
	self.UserModel.Bio = self.User.Bio
	self.UserModel.Provider = "local"
	self.UserModel.Type = "client"


	if self.User.Password != common.NBRandomPassword {
		self.UserModel.setPassword(self.User.Password)
	}
	if self.User.Image != "" {
		self.UserModel.Image = &self.User.Image
	}
	if self.User.Bio == "" {
		self.UserModel.Bio = "Hola soy el pepe"
	}
	return nil
}

// You can put the default value of a Validator here
func NewUserValidator() UserValidator {
	userModelValidator := UserValidator{}
	//userModelValidator.User.Email ="w@g.cn"
	return userModelValidator
}

func NewUserValidatorFillWith(UserModel User) UserValidator {
	userModelValidator := NewUserValidator()
	userModelValidator.User.Username = UserModel.Username
	userModelValidator.User.Email = UserModel.Email
	userModelValidator.User.Bio = UserModel.Bio
	userModelValidator.User.Password = common.NBRandomPassword

	if UserModel.Image != nil {
		userModelValidator.User.Image = *UserModel.Image
	}
	return userModelValidator
}

type LoginValidator struct {
	User struct {
		Email    string `form:"email" json:"email" binding:"required,email"`
		Password string `form:"password" json:"password" binding:" required,min=8,max=255"`
	} `json:"user"`
	UserModel User `json:"-"`
}

func (self *LoginValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, self)
	if err != nil {
		return err
	}

	self.UserModel.Email = self.User.Email
	return nil
}

// You can put the default value of a Validator here
func NewLoginValidator() LoginValidator {
	loginValidator := LoginValidator{}
	return loginValidator
}
