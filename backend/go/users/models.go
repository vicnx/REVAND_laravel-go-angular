package users
import (
    "time"
)
type Users struct {
	ID           uint    `gorm:"primary_key"`
	Username     string  `gorm:"column:username"`
	Email        string  `gorm:"column:email;unique_index"`
	Bio          string  `gorm:"column:bio;size:1024"`
	Image        *string `gorm:"column:image"`
	Provider     string  `gorm:"column:provider"`
	Type     	 string  `gorm:"column:type"`
	CreatedAt	 time.Time
	UpdatedAt 	 time.Time
	PasswordHash string  `gorm:"column:password;not null"`
}