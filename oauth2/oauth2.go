package oauth2

import (
	"fmt"
	"lq-center-go/consts"
	"lq-center-go/models"
	"time"
)

var store *TokenStore

func init() {
	fmt.Println("----------OAUTH2 INIT BEGAN ----------")
	var err error
	store, err = NewStore()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("----------OAUTH2 INIT END ----------")
}

// LoginSuccess 用账号密码登陆成功
func LoginSuccess(userID int64) (*Token, error) {
	if userID <= consts.IDNull {
		return nil, models.ErrUserNotExsit
	}
	return CreateTokenByUserID(userID)
}

// CheckToken 检查 Token 是否有效
func CheckToken(code string) (*Token, error) {
	if code == "" {
		return nil, ErrTokenCodeNull
	}

	token, err := store.GetTokenByToken(code)
	if err != nil {
		return nil, err
	}

	return token, nil
}

// CreateTokenByUserID 创建token by userid
func CreateTokenByUserID(userID int64) (*Token, error) {
	if userID < consts.IDNull {
		return nil, models.ErrUserNotExsit
	}
	createTime := time.Now()
	gb := GenerateBasic{UserID: userID, CreateAt: createTime}
	tcfg := DefaultPasswordTokenCfg
	code, refresh, err := GenerateCode(&gb, tcfg.IsGenerateRefresh)
	if err != nil {
		return nil, err
	}

	token := NewToken()
	token.SetUserID(userID)
	token.SetCode(code)
	token.SetCodeCreateAt(createTime)
	token.SetCodeExpiresIn(tcfg.AccessTokenExp)
	if tcfg.IsGenerateRefresh {
		token.SetRefresh(refresh)
		token.SetRefreshCreateAt(createTime)
		token.SetRefreshExpiresIn(tcfg.RefreshTokenExp)
	}

	err = store.Save(token)
	if err != nil {
		return nil, err
	}

	return token, nil
}

// RefreshToken 刷新Token
func RefreshToken(refresh string) (*Token, error) {
	if refresh == "" {
		return nil, ErrTokenRefreshNull
	}

	token, err := store.GetTokenByRefresh(refresh)
	if err != nil {
		return nil, err
	}
	if token != nil {
		// 创建新的Token
		newToken, err := CreateTokenByUserID(token.GetUserID())
		if err != nil {
			return nil, err
		} else {
			// 删除老的Token
			store.RemoveByToken(token)
		}
		return newToken, nil
	}
	return token, nil
}

// GetToken 获取Token
func GetToken(code string) (*Token, error) {
	token, err := store.GetTokenByToken(code)
	if err != nil {
		return nil, err
	}
	return token, nil
}
