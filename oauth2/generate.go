package oauth2

import (
	"bytes"
	"encoding/base64"
	"strconv"
	"strings"
	"time"

	uuid "github.com/satori/go.uuid"
)

// GenerateBasic struct
type GenerateBasic struct {
	UserID   int64
	CreateAt time.Time
}

// GenerateCode 生成code
func GenerateCode(data *GenerateBasic, isGenRefresh bool) (code, refresh string, err error) {

	buf := bytes.NewBufferString("")
	buf.WriteString(strconv.FormatInt(data.UserID, 10))
	buf.WriteString(strconv.FormatInt(data.CreateAt.UnixNano(), 10))

	if u, err := uuid.NewV4(); err == nil {
		code = base64.URLEncoding.EncodeToString(uuid.NewV3(u, buf.String()).Bytes())
		code = strings.ToUpper(strings.TrimRight(code, "="))
		if isGenRefresh {
			if u, err = uuid.NewV4(); err == nil {
				refresh = base64.URLEncoding.EncodeToString(uuid.NewV5(u, buf.String()).Bytes())
				refresh = strings.ToUpper(strings.TrimRight(refresh, "="))
			} else {
				return "", "", err
			}
		}
	} else {
		return "", "", err
	}

	return
}
