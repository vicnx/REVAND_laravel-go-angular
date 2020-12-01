package users

import (
	"github.com/gin-gonic/gin"

	"github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"
)

type ProfileSerializer struct {
	C *gin.Context
	Users
}

// Declare your response schema here
type ProfileResponse struct {
	ID        uint    `json:"-"`
	Username  string  `json:"username"`
	Bio       string  `json:"bio"`
	Image     *string `json:"image"`
	// Following bool    `json:"following"`
}

// Put your response logic including wrap the Users here.
func (self *ProfileSerializer) Response() ProfileResponse {
	// myUsers := self.C.MustGet("my_user_model").(Users)
	profile := ProfileResponse{
		ID:        self.ID,
		Username:  self.Username,
		Bio:       self.Bio,
		Image:     self.Image,
		// Following: myUsers.isFollowing(self.Users),
	}
	return profile
}

type UserSerializer struct {
	c *gin.Context
}

type UserResponse struct {
	Username string  `json:"username"`
	Email    string  `json:"email"`
	Bio      string  `json:"bio"`
	Image    *string `json:"image"`
	Provider string `json:"provider"`
	Type     string `json:"type"`
	Token    string  `json:"token"`
}

func (self *UserSerializer) Response() UserResponse {
	myUsers := self.c.MustGet("my_user_model").(Users)
	user := UserResponse{
		Username: myUsers.Username,
		Email:    myUsers.Email,
		Bio:      myUsers.Bio,
		Image:    myUsers.Image,
		Provider: myUsers.Provider,
		Type:	  myUsers.Type,
		Token:    common.GenToken(myUsers.ID),
	}
	return user
}
