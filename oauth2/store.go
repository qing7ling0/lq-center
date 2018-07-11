package oauth2

import (
	"encoding/json"
	"time"

	"github.com/astaxie/beego/cache"
	_ "github.com/astaxie/beego/cache/redis"
	uuid "github.com/satori/go.uuid"
)

// TokenStore struct
type TokenStore struct {
	rdCache cache.Cache
}

// New creaet TokenStore
func NewStore() (*TokenStore, error) {
	bm, err := cache.NewCache("redis", `{"key":"tokenStore","conn":":6039","dbNum":"0","password":""}`)
	if err != nil {
		return nil, err
	}

	return &TokenStore{bm}, nil
}

// Save create token store
func (s *TokenStore) Save(token *Token) (err error) {
	if token == nil {
		return ErrPointerNil
	}
	if token.GetCode() != "" {
		return ErrTokenCodeNull
	}
	if token.GetRefresh() != "" {
		return ErrTokenRefreshNull
	}
	createTime := time.Now()
	codeExpires := token.GetCodeCreateAt().Add(token.GetCodeExpiresIn()).Sub(createTime)
	refreshExpires := codeExpires

	if codeExpires > 0 {
		jv, err := json.Marshal(token)
		if err != nil {
			return err
		}
		uuidT, err := uuid.NewV4()
		if err != nil {
			return err
		}
		basicID := uuidT.String()
		if refresh := token.GetRefresh(); refresh != "" {
			refreshExpires = token.GetRefreshCreateAt().Add(token.GetRefreshExpiresIn()).Sub(createTime)
			err = s.rdCache.Put(refresh, basicID, refreshExpires)
			if err != nil {
				return err
			}
		}

		err = s.rdCache.Put(basicID, jv, refreshExpires)
		if err != nil {
			return err
		}

		err = s.rdCache.Put(token.GetCode(), basicID, codeExpires)
		return err
	}

	return ErrTokenExpireNull
}

// remove key
func (s *TokenStore) remove(key string) error {
	return s.rdCache.Delete(key)
}

// RemoveByCode use the access token to delete the token information
func (s *TokenStore) RemoveByCode(code string) error {
	return s.remove(code)
}

// RemoveByRefresh use the refresh token to delete the token information
func (s *TokenStore) RemoveByRefresh(refresh string) error {
	return s.remove(refresh)
}

// GetTokenByToken by access token
func (s *TokenStore) GetTokenByToken(code string) (*Token, error) {
	basicID, err := s.getBasicID(code)
	if err != nil {
		return nil, err
	}
	t, err := s.getData(basicID)
	if err != nil {
		return nil, err
	}
	return t, err
}

// GetTokenByRefresh by refresh token
func (s *TokenStore) GetTokenByRefresh(refresh string) (*Token, error) {
	basicID, err := s.getBasicID(refresh)
	if err != nil {
		return nil, err
	}
	t, err := s.getData(basicID)
	if err != nil {
		return nil, err
	}
	return t, err
}

// getBasicID by key
func (s *TokenStore) getBasicID(key string) (basicID string, err error) {
	v := s.rdCache.Get(key)
	if v == nil {
		return "", ErrTokenNotExist
	}
	basicID = string(v.([]byte))

	return basicID, nil
}

// getData by key
func (s *TokenStore) getData(key string) (token *Token, err error) {
	jv := s.rdCache.Get(key)
	if jv == nil {
		return nil, ErrTokenNotExist
	}
	var _t Token
	err = json.Unmarshal(jv.([]byte), &_t)
	if err != nil {
		return nil, err
	}
	token = &_t
	return token, nil
}
