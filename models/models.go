package models

import "errors"

// Define common vars
var (
	ErrFailed             = errors.New("请求失败！")
	ErrAccountPassNull    = errors.New("账号密码不能为空！")
	ErrAccountPassInvalid = errors.New("账号密码格式不正确！")
	ErrAccountExsit       = errors.New("账号已存在！")
	ErrAccountNotExsit    = errors.New("账号不存在！")
	ErrRegisterFailed     = errors.New("注册失败！")
	ErrUserNotExsit       = errors.New("用户不存在！")
)

// Define common constants
const (
	ChannelTaoTu     string = "taotu" // 默认韬图渠道
	IDNull           int64  = 0       // ID 为空
	AccountMaxLength int    = 30      // 账号密码的最大长度
	AccountMinLength int    = 5       // 账号密码的最小长度
)
