package controllers

import (
	"encoding/json"
	"fmt"
	"lq-center-go/models"

	"github.com/astaxie/beego"
)

// Operations about Users
type UserController struct {
	beego.Controller
}

// type UserInput struct

// Get
// @Description get user by uid
// @Param	uid		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.User
// @Failure 403 :uid is empty
// @router /profile/:uid [get]
func (u *UserController) Profile() {
	uid := u.GetString(":uid")
	u.Data["json"] = uid
	u.ServeJSON()
}

// @Title Login
// @router /login [post]
func (u *UserController) Login() {
	user := models.UserInput{}
	err := json.Unmarshal(u.Ctx.Input.RequestBody, &user)

	_, rgErr := models.Register(&models.RegisterInput{Account: "lq-1212", Password: "wuqingqing", Channel: models.ChannelTaoTu})
	if rgErr != nil {
		fmt.Println("注册失败:" + rgErr.Error())
		u.ServeJSON()
		return
	}
	if err == nil {
		fmt.Println("Login account=" + string(u.Ctx.Input.RequestBody))
		sucUser, loginErr := models.Login(&user)
		if loginErr != nil {
			u.Data["json"] = Error2Response(loginErr)
		} else {
			u.Data["json"] = Success2Response(sucUser)
		}
	} else {
		fmt.Println(err.Error())
		u.Data["json"] = ResponseError
	}
	u.ServeJSON()
}

// @Title Login
func (u *UserController) Register() {

}
