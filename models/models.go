package models

import (
	"errors"
)

// Define common vars
var (
	ErrFailed             = errors.New("请求失败！")
	ErrChannelNotExsit    = errors.New("登陆渠道不存在！")
	ErrAccountPassNull    = errors.New("账号密码不能为空！")
	ErrAccountPassInvalid = errors.New("账号密码格式不正确！")
	ErrAccountExsit       = errors.New("账号已存在！")
	ErrAccountNotExsit    = errors.New("账号不存在！")
	ErrAccountPass        = errors.New("账号密码错误")
	ErrRegisterFailed     = errors.New("注册失败！")
	ErrUserNotExsit       = errors.New("用户不存在！")
)
