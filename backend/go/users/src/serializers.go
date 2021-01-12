package users

import (
	"github.com/gin-gonic/gin"
	"fmt"
	"goApp/common"
)

type ProfileSerializer struct {
	C *gin.Context
	User
}

// Declare your response schema here
type ProfileResponse struct {
	ID        uint    `json:"id"`
	Username  string  `json:"username"`
	Bio       string  `json:"bio"`
	Image     *string `json:"image"`
	Following bool    `json:"following"`
}

// Put your response logic including wrap the userModel here.
func (self *ProfileSerializer) Response() ProfileResponse {
	myUser := self.C.MustGet("my_user_model").(User)
	profile := ProfileResponse{
		ID:        self.ID,
		Username:  self.Username,
		Bio:       self.Bio,
		Image:     self.Image,
		Following: myUser.isFollowing(self.User),
	}
	return profile
}

type UserSerializer struct {
	c *gin.Context
}

type UserResponse struct {
	ID        uint    `json:"id"`
	Username string  `json:"username"`
	Email    string  `json:"email"`
	Bio      string  `json:"bio"`
	Image    *string `json:"image"`
	Provider string `json:"provider"`
	Type     string `json:"type"`
	Token    string  `json:"token"`
}

func (self *UserSerializer) Response() UserResponse {
	myUser := self.c.MustGet("my_user_model").(User)
	user := UserResponse{
		ID: 		myUser.ID,
		Username: myUser.Username,
		Email:    myUser.Email,
		Bio:      myUser.Bio,
		Image:    myUser.Image,
		Provider: myUser.Provider,
		Type:	  myUser.Type,
		Token:    common.GenToken(myUser.ID),
	}
	fmt.Println("wadawdwadwadwadawdwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
	fmt.Println(user);
	return user
}
