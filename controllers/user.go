package controllers

import (
	"encoding/json"
	"fmt"
	"lq-center-go/models"
	"lq-center-go/oauth2"

	"github.com/astaxie/beego"
)

// UserController Operations about Users
type UserController struct {
	beego.Controller
}

// Profile get user profile
// @Description get user by uid
// @Param	uid		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.User
// @Failure 403 :uid is empty
// @router /profile/:uid [get]
func (u *UserController) Profile() {
	uid, err := u.GetInt64(":uid")
	user, err := models.GetUserProfile(uid)
	if user != nil {
		out, err := models.User2ProfileOutput(user)
		if err == nil {
			u.Data["json"] = Success2Response(out)
		} else {
			u.Data["json"] = Error2Response(err)
		}
	} else {
		u.Data["json"] = Error2Response(err)
	}
	u.ServeJSON()
}

// Profile get user profile
// @Description get user by uid
// @Param	uid		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.User
// @Failure 403 :uid is empty
// @router /profile_token/:uid [get]
func (u *UserController) ProfileByToken() {
	token := u.GetString(":token")
	tokenInfo, err := oauth2.CheckToken(token)
	if tokenInfo != nil {
		user, err := models.GetUserProfile(tokenInfo.GetUserID())
		if user != nil {
			out, err := models.User2ProfileOutput(user)
			if out != nil {
				u.Data["json"] = Success2Response(out)
			} else {
				u.Data["json"] = Error2Response(err)
			}
		} else {
			u.Data["json"] = Error2Response(err)
		}
	} else {
		u.Data["json"] = Error2Response(err)
	}
	u.ServeJSON()
}

// Login user login
// @router /login [post]
func (u *UserController) Login() {
	session := u.GetSession("token")
	// session 判断
	if session != nil {
		token := session.(models.TokenOutput)
		u.Data["json"] = Success2Response(&token)
		u.ServeJSON()
		return
	}
	user := models.UserInput{}
	if err := json.Unmarshal(u.Ctx.Input.RequestBody, &user); err == nil {
		fmt.Println("Login account=" + string(u.Ctx.Input.RequestBody))
		sucUser, loginErr := models.Login(&user)
		if loginErr != nil {
			u.Data["json"] = Error2Response(loginErr)
		} else {
			models.LoginSuccess(sucUser.Id, "ip")
			token, err := oauth2.LoginSuccess(sucUser.Id)
			if err != nil {
				u.Data["json"] = Error2Response(err)
			} else {
				tokenOut := models.TokenOutput{
					AccessToken:  token.GetCode(),
					RefreshToken: token.GetRefresh(),
					ExpiresIn:    token.GetCodeExpiresIn()}
				u.SetSession("token", tokenOut)
				u.SetSession("user", sucUser)
				u.Data["json"] = Success2Response(&tokenOut)
			}
		}
	} else {
		fmt.Println(err.Error())
		u.Data["json"] = ResponseError
	}
	u.ServeJSON()
}

// Register user register
func (u *UserController) Register() {
	userInput := models.RegisterInput{}
	if err := json.Unmarshal(u.Ctx.Input.RequestBody, &userInput); err != nil {
		user, err := models.Register(&userInput)
		if err != nil {
			u.Data["json"] = Error2Response(err)
		} else {
			models.LoginSuccess(user.Id, "ip")
			token, err := oauth2.LoginSuccess(user.Id)
			if err != nil {
				u.Data["json"] = Error2Response(err)
			} else {
				tokenOut := models.TokenOutput{
					AccessToken:  token.GetCode(),
					RefreshToken: token.GetRefresh(),
					ExpiresIn:    token.GetCodeExpiresIn()}
				u.SetSession("token", tokenOut)
				u.SetSession("user", user)
				u.Data["json"] = Success2Response(&tokenOut)
			}
		}
	} else {
		u.Data["json"] = ResponseError
	}
	u.ServeJSON()
}

// RefreshToken refresh token
// @router /refresh [post]
func (u *UserController) RefreshToken() {
	input := map[string]interface{}{}
	if err := json.Unmarshal(u.Ctx.Input.RequestBody, &input); err != nil {
		refreshToken := input["refreshToken"].(string)
		if refreshToken != "" {
			token, err := oauth2.RefreshToken(refreshToken)
			if err == nil {
				tokenOut := models.TokenOutput{
					AccessToken:  token.GetCode(),
					RefreshToken: token.GetRefresh(),
					ExpiresIn:    token.GetCodeExpiresIn()}
				u.SetSession("token", tokenOut)
				u.Data["json"] = Success2Response(&tokenOut)
			}
		} else {
			u.Data["json"] = ResponseError
		}
	} else {
		u.Data["json"] = ResponseError
	}
	u.ServeJSON()
}
