package awards

import (
	"fmt"
	// "errors"
	// "github.com/yomogan/6_gin_gonic_thinkster/common"
	// "github.com/yomogan/6_gin_gonic_thinkster/users"
	"gopkg.in/gin-gonic/gin.v1"
	"net/http"
	// "strconv"
)

func AwardsAuthed(router *gin.RouterGroup) {
	router.POST("/", AwardCreate)
	router.GET("/", AwardList)
	router.GET("/:id", AwardByID)
	router.PUT("/:id", AwardUpdate)
	router.DELETE("/:id", AwardDelete)
	router.DELETE("/", AwardDeleteAll)
}

func AwardList(c *gin.Context) {
	var award []Awards
	err := GetAllAwards(&award)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, award)
	}
}

func AwardByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var award Awards
	err := GetAwardByID(&award, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, award)
	}
}

func AwardUpdate(c *gin.Context) {
	var award Awards
	id := c.Params.ByName("id")
	err := GetAwardByID(&award, id) //te llena &award (si lo encuentra pone err a nil (la instancia))
	if err != nil { //si no esta instanciada
		fmt.Println("err no es nil")
		c.JSON(http.StatusNotFound, "NOT FOUND") // envia al cliente un JSON
	}else{ //si esta instanciada hace el update
		c.BindJSON(&award) // recoge los nuevos datos del cliente y los guarda en &award
		err = UpdateAward(&award) // guardamos los nuevos datos
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, award)
		}
	}
}

func AwardCreate(c *gin.Context) {
	var award Awards
	c.BindJSON(&award)
	err := CreateAward(&award)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, award)
	}
}

func AwardDelete(c *gin.Context) {
	var award Awards
	id := c.Params.ByName("id")
	err := DeleteAward(&award,id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id: " + id: "is deleted"})
	}
}

func AwardDeleteAll(c *gin.Context) {
	var award Awards
	err := DeleteAllAwards(&award)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, "Truncate award")
	}
	// var award []Awards
	// err := GetAllAwards(&award)
	// if err != nil { //si no esta instanciada
	// 	c.JSON(http.StatusNotFound, "NOT FOUND")
	// }else{ //si esta instanciada hace el update
	// 	err = DeleteAllAwards(&award) // guardamos los nuevos datos
	// 	if err != nil {
	// 		c.AbortWithStatus(http.StatusNotFound)
	// 	} else {
	// 		c.JSON(http.StatusOK, award)
	// 	}
	// }
}
