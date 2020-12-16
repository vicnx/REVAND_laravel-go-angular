package products

import (
	_ "fmt"
	"goApp/common"
	"goApp/users"
	"strconv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Product struct {
	Slug        string
	Name		string
	Description string
	Images		[]string
	Price 		string
	Author      ProductUser
	AuthorID    uint
}


type ProductUser struct {
	UserModel      	users.UserModel
	UserModelID    	uint
	Products  		[]Product
	FavoriteModels 	[]FavoriteModel
}

type FavoriteModel struct {
	Favorite     Product
	FavoriteID   uint
	FavoriteBy   ProductUser
	FavoriteByID uint
}

func GetProductUser(userModel users.UserModel) ProductUser {
	var productUser ProductUser
	if userModel.ID == 0 {
		return productUser
	}
	db := common.GetDB()
	db.Where(&ProductUser{
		UserModelID: userModel.ID,
	}).FirstOrCreate(&productUser)
	productUser.UserModel = userModel
	return productUser
}

func (product Product) favoritesCount() uint {
	db := common.GetDB()
	var count uint
	db.Model(&FavoriteModel{}).Where(FavoriteModel{
		FavoriteID: product.ID,
	}).Count(&count)
	return count
}

func (product Product) isFavoriteBy(user ProductUser) bool {
	db := common.GetDB()
	var favorite FavoriteModel
	db.Where(FavoriteModel{
		FavoriteID:   product.ID,
		FavoriteByID: user.ID,
	}).First(&favorite)
	return favorite.ID != 0
}

func (product Product) favoriteBy(user ProductUser) error {
	db := common.GetDB()
	var favorite FavoriteModel
	err := db.FirstOrCreate(&favorite, &FavoriteModel{
		FavoriteID:   product.ID,
		FavoriteByID: user.ID,
	}).Error
	return err
}

func (product Product) unFavoriteBy(user ProductUser) error {
	db := common.GetDB()
	err := db.Where(FavoriteModel{
		FavoriteID:   product.ID,
		FavoriteByID: user.ID,
	}).Delete(FavoriteModel{}).Error
	return err
}

func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

func FindOneProduct(condition interface{}) (Product, error) {
	db := common.GetDB()
	var model Product
	tx := db.Begin()

	tx.Where(condition).First(&model)
	//db.Debug().Where(condition).First(&model)
	tx.Model(&model).Related(&model.Author, "Author")
	tx.Model(&model.Author).Related(&model.Author.UserModel)
	tx.Model(&model).Related(&model.Tags, "Tags")
	err := tx.Commit().Error
	
	return model, err
}

func (self *Product) getComments() error {
	db := common.GetDB()
	tx := db.Begin()
	tx.Model(self).Related(&self.Comments, "Comments")
	for i, _ := range self.Comments {
		tx.Model(&self.Comments[i]).Related(&self.Comments[i].Author, "Author")
		tx.Model(&self.Comments[i].Author).Related(&self.Comments[i].Author.UserModel)
	}
	err := tx.Commit().Error
	return err
}

func getAllTags() ([]TagModel, error) {
	db := common.GetDB()
	var models []TagModel
	err := db.Find(&models).Error
	return models, err
}

func FindManyProduct(tag, author, limit, offset, favorited string) ([]Product, int, error) {
	db := common.GetDB()
	var models []Product
	var count int

	offset_int, err := strconv.Atoi(offset)
	if err != nil {
		offset_int = 0
	}

	limit_int, err := strconv.Atoi(limit)
	if err != nil {
		limit_int = 20
	}

	tx := db.Begin()
	if tag != "" {
		var tagModel TagModel
		tx.Where(TagModel{Tag: tag}).First(&tagModel)
		if tagModel.ID != 0 {
			tx.Model(&tagModel).Offset(offset_int).Limit(limit_int).Related(&models, "Products")
			count = tx.Model(&tagModel).Association("Products").Count()
		}
	} else if author != "" {
		var userModel users.UserModel
		tx.Where(users.UserModel{Username: author}).First(&userModel)
		productUser := GetProductUser(userModel)

		if productUser.ID != 0 {
			count = tx.Model(&productUser).Association("Products").Count()
			tx.Model(&productUser).Offset(offset_int).Limit(limit_int).Related(&models, "Products")
		}
	} else if favorited != "" {
		var userModel users.UserModel
		tx.Where(users.UserModel{Username: favorited}).First(&userModel)
		productUser := GetProductUser(userModel)
		if productUser.ID != 0 {
			var favoriteModels []FavoriteModel
			tx.Where(FavoriteModel{
				FavoriteByID: productUser.ID,
			}).Offset(offset_int).Limit(limit_int).Find(&favoriteModels)

			count = tx.Model(&productUser).Association("FavoriteModels").Count()
			for _, favorite := range favoriteModels {
				var model Product
				tx.Model(&favorite).Related(&model, "Favorite")
				models = append(models, model)
			}
		}
	} else {
		db.Model(&models).Count(&count)
		db.Offset(offset_int).Limit(limit_int).Find(&models)
	}

	for i, _ := range models {
		tx.Model(&models[i]).Related(&models[i].Author, "Author")
		tx.Model(&models[i].Author).Related(&models[i].Author.UserModel)
		tx.Model(&models[i]).Related(&models[i].Tags, "Tags")
	}
	err = tx.Commit().Error
	return models, count, err
}

func (self *ProductUser) GetProductFeed(limit, offset string) ([]Product, int, error) {
	db := common.GetDB()
	var models []Product
	var count int

	offset_int, err := strconv.Atoi(offset)
	if err != nil {
		offset_int = 0
	}
	limit_int, err := strconv.Atoi(limit)
	if err != nil {
		limit_int = 20
	}

	tx := db.Begin()
	followings := self.UserModel.GetFollowings()
	var productUserModels []uint
	for _, following := range followings {
		productUser := GetProductUser(following)
		productUserModels = append(productUserModels, productUser.ID)
	}

	tx.Where("author_id in (?)", productUserModels).Order("updated_at desc").Offset(offset_int).Limit(limit_int).Find(&models)

	for i, _ := range models {
		tx.Model(&models[i]).Related(&models[i].Author, "Author")
		tx.Model(&models[i].Author).Related(&models[i].Author.UserModel)
		tx.Model(&models[i]).Related(&models[i].Tags, "Tags")
	}
	err = tx.Commit().Error
	return models, count, err
}

func (model *Product) setTags(tags []string) error {
	db := common.GetDB()
	var tagList []TagModel
	for _, tag := range tags {
		var tagModel TagModel
		err := db.FirstOrCreate(&tagModel, TagModel{Tag: tag}).Error
		if err != nil {
			return err
		}
		tagList = append(tagList, tagModel)
	}
	model.Tags = tagList
	return nil
}

func (model *Product) Update(data interface{}) error {
	db := common.GetDB()
	err := db.Model(model).Update(data).Error
	return err
}

func DeleteProduct(condition interface{}) error {
	db := common.GetDB()
	err := db.Where(condition).Delete(Product{}).Error
	return err
}

func DeleteCommentModel(condition interface{}) error {
	db := common.GetDB()
	err := db.Where(condition).Delete(CommentModel{}).Error
	return err
}
