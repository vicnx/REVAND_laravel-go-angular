package users

import (
	"errors"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"
)

func UsersRegister(router *gin.RouterGroup) {
	router.GET("/", UsersRetrieve)
	router.GET("/:userid", UserAuthorRetrieve)
	router.POST("/", UsersRegistration)
	router.POST("/login", UsersLogin)
	router.PUT("/:userid",UserUpdateAdmin)
	router.DELETE("/:userid",UserDeleteAdmin)
}



func UserRegister(router *gin.RouterGroup) {
	router.GET("/", UserRetrieve)
	router.PUT("/", UserUpdate)
}

func ProfileRegister(router *gin.RouterGroup) {
	router.GET("/:username", ProfileRetrieve)
	router.POST("/:username/follow", ProfileFollow)
	router.DELETE("/:username/follow", ProfileUnfollow)
}

func ProfileRetrieve(c *gin.Context) {
	fmt.Println("PROFILE RETRIEVE");
	
	username := c.Param("username")
	userModel, err := FindOneUser(&User{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	profileSerializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, profileSerializer.Response())
}

func ProfileFollow(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&User{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	myUser := c.MustGet("my_user_model").(User)
	err = myUser.following(userModel)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}

func ProfileUnfollow(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&User{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	myUser := c.MustGet("my_user_model").(User)

	err = myUser.unFollowing(userModel)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}

func UsersRegistration(c *gin.Context) {
	userModelValidator := NewUserValidator()
	if err := userModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}

	if err := SaveOne(&userModelValidator.userModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	c.Set("my_user_model", userModelValidator.userModel)
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, gin.H{"user": serializer.Response()})
}

func UsersLogin(c *gin.Context) {
	loginValidator := NewLoginValidator()
	if err := loginValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}
	userModel, err := FindOneUser(&User{Email: loginValidator.userModel.Email})

	if err != nil {
		c.JSON(http.StatusForbidden, common.NewError("login", errors.New("Not Registered email or invalid password")))
		return
	}

	if userModel.checkPassword(loginValidator.User.Password) != nil {
		c.JSON(http.StatusForbidden, common.NewError("login", errors.New("Not Registered email or invalid password")))
		return
	}
	UpdateContextUser(c, userModel.ID)
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}

func UserRetrieve(c *gin.Context) {
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}

func UserUpdate(c *gin.Context) {
	myUser := c.MustGet("my_user_model").(User)
	userModelValidator := NewUserValidatorFillWith(myUser)
	if err := userModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}

	userModelValidator.userModel.ID = myUser.ID
	if err := myUser.Update(userModelValidator.userModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	UpdateContextUser(c, myUser.ID)
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}

func UsersRetrieve(c *gin.Context) {
	var user []User
	err := GetAllUsers(&user)
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, user)
		
	}
}

func UserUpdateAdmin(c *gin.Context) {
	var user User
	id := c.Params.ByName("userid")

	fmt.Println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
	fmt.Println(user)
	err := GetUserByID(&user, id)
	if err != nil { //si no esta instanciada
		c.JSON(http.StatusNotFound, "NOT FOUND") // envia al cliente un JSON
	}else{ //si esta instanciada hace el update
		// fmt.Println(c.BindJSON(&award))
		c.BindJSON(&user) // recoge los nuevos datos del cliente y los guarda en &user
		err = UpdateUserAdmin(&user) // guardamos los nuevos datos
		if err != nil {
			c.JSON(http.StatusOK, "Not found")
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, gin.H{"user": user})
			return
		}
	}
}

func UserDeleteAdmin(c *gin.Context) {
	var user User
	id := c.Params.ByName("userid")
	err := DeleteUserAdmin(&user,id)
	if err != nil {
		// c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"userid: " + id: "is deleted"})
	}
}

func UserAuthorRetrieve(c *gin.Context){
	var user User
	id := c.Params.ByName("userid")
	err := GetUserByID(&user, id)
	if err != nil { //si no esta instanciada
		c.JSON(http.StatusNotFound, "NOT FOUND") // envia al cliente un JSON
	}else{ //si esta instanciada hace el update
		// fmt.Println(c.BindJSON(&award))
		// c.BindJSON(&user) // recoge los nuevos datos del cliente y los guarda en &user
		serializer := UserSerializer{c}
		c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
		return
	}
}