package awards

import (
	_ "fmt"
	_ "github.com/jinzhu/gorm"
	_ "github.com/revand/App_Go_Larave_Angular_TEST/backend/go/common"
	_ "strconv"
)

type Awards struct {
	Id      uint   `json:"id"`
	Name    string `json:"name"`
	Description   string `json:"description"`
	Image   string `json:"image"`
}

// func (b *User) TableName() string {
// 	return "user"
// }