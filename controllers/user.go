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
		out := models.User2ProfileOutput(user)
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
// @Failure 403 :token is empty
// @router /profile_token/:token [get]
func (u *UserController) ProfileByToken() {
	token := u.GetString(":token")
	tokenInfo, _ := oauth2.CheckToken(token)
	if tokenInfo != nil {
		user, err := models.GetUserProfile(tokenInfo.GetUserID())
		if user != nil {
			out := models.User2ProfileOutput(user)
			if out != nil {
				u.Data["json"] = Success2Response(out)
			} else {
				u.Data["json"] = Error2Response(err)
			}
		} else {
			u.Data["json"] = Error2Response(err)
		}
	} else {
		u.Data["json"] = CreateResponse(1, "Token已失效，请重新登陆", nil)
	}
	u.ServeJSON()
}

// Login user login
// @router /login [post]
func (u *UserController) Login() {
	user, err := u.onLogin()
	// h := md5.New()
	// h.Write([]byte("wuqingqing")) // 需要加密的字符串为 123456
	// cipherStr := h.Sum(nil)
	// fmt.Println("register password=" + hex.EncodeToString(cipherStr))
	// models.Register(&models.RegisterInput{Account: "lq-1212", Password: hex.EncodeToString(cipherStr), Channel: consts.ChannelTaoTu})
	if user != nil {
		out := models.User2ProfileOutput(user)
		if out != nil {
			u.SetSession("user", *user)
			u.Data["json"] = Success2Response(out)
		} else {
			u.Data["json"] = Error2Response(err)
		}
	} else {
		u.Data["json"] = Error2Response(err)
	}
	u.ServeJSON()
}

// Login user login
// @router /login-check [post]
func (u *UserController) LoginCheck() {
	session := u.GetSession("user")
	// session 判断
	if session == nil {
		u.Data["json"] = Error2Response(models.ErrAccountExpired)
	} else {
		user := session.(models.User)
		out := models.User2ProfileOutput(&user)
		if out != nil {
			u.SetSession("user", user)
			u.Data["json"] = Success2Response(out)
		} else {
			u.Data["json"] = ResponseError
		}
	}
	u.ServeJSON()
}

// Register user register
// @router /register [post]
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

// Token user Token
// @router /token [post]
func (u *UserController) Token() {
	user, err := u.onLogin()
	if user != nil {
		token, err := oauth2.LoginSuccess(user.Id)
		if err != nil {
			u.Data["json"] = Error2Response(err)
		} else {
			userOut := models.User2ProfileOutput(user)
			tokenOut := models.TokenOutput{
				AccessToken:  token.GetCode(),
				RefreshToken: token.GetRefresh(),
				ExpiresIn:    token.GetCodeExpiresIn(),
				User:         userOut}
			u.SetSession("token", tokenOut)
			u.SetSession("user", user)
			fmt.Println("Token", tokenOut)
			u.Data["json"] = Success2Response(tokenOut)
		}
	} else {
		u.Data["json"] = Error2Response(err)
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
				user, _ := models.GetUserProfile(token.GetUserID())
				if user != nil {
					userOut := models.User2ProfileOutput(user)
					tokenOut := models.TokenOutput{
						AccessToken:  token.GetCode(),
						RefreshToken: token.GetRefresh(),
						ExpiresIn:    token.GetCodeExpiresIn(),
						User:         &userOut}
					u.SetSession("token", tokenOut)
					u.SetSession("user", user)
					u.Data["json"] = Success2Response(&tokenOut)
				}
			} else {
				u.Data["json"] = CreateResponse(1, "RefreshToken已失效，请重新登陆", nil)
			}
		} else {
			u.Data["json"] = ResponseError
		}
	} else {
		u.Data["json"] = ResponseError
	}
	u.ServeJSON()
}

func (u *UserController) onLogin() (*models.User, error) {
	session := u.GetSession("user")
	// session 判断
	if session != nil {
		user := session.(models.User)
		return &user, nil
	}
	user := models.UserInput{}
	if err := json.Unmarshal(u.Ctx.Input.RequestBody, &user); err == nil {
		fmt.Println("Login user=%v", &user)
		sucUser, loginErr := models.Login(&user)
		if loginErr != nil {
			return nil, loginErr
		} else {
			models.LoginSuccess(sucUser.Id, "ip")
			return sucUser, nil
		}
	} else {
		return nil, models.ErrFailed
	}
}
