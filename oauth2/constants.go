package oauth2

import (
	"errors"
	"time"
)

type GrantType string

type TokenConfig struct {
	// access token expiration time
	AccessTokenExp time.Duration
	// refresh token expiration time
	RefreshTokenExp time.Duration
	// whether to generate the refreshing token
	IsGenerateRefresh bool
}

// common vars
var (
	ErrPointerNil       error = errors.New("pointer is nil")
	ErrTokenCodeNull    error = errors.New("token code is null")
	ErrTokenRefreshNull error = errors.New("token refresh is null")
	ErrTokenExpireNull  error = errors.New("token is expire")
	ErrTokenNotExist    error = errors.New("token not exist")

	PasswordCredentials     GrantType    = "password"
	DefaultPasswordTokenCfg *TokenConfig = &TokenConfig{AccessTokenExp: time.Hour * 2, RefreshTokenExp: time.Hour * 24 * 7, IsGenerateRefresh: true}
)
