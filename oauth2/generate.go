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
	UserID   string
	CreateAt time.Time
}

// GenerateCode 生成code
func GenerateCode(data *GenerateBasic, isGenRefresh bool) (code, refresh string, err error) {

	buf := bytes.NewBufferString(data.UserID)
	buf.WriteString(data.UserID)
	buf.WriteString(strconv.FormatInt(data.CreateAt.UnixNano(), 10))

	code = base64.URLEncoding.EncodeToString(uuid.NewV3(uuid.NewV4(), buf.String()).Bytes())
	code = strings.ToUpper(strings.TrimRight(code, "="))
	if isGenRefresh {
		refresh = base64.URLEncoding.EncodeToString(uuid.NewV5(uuid.NewV4(), buf.String()).Bytes())
		refresh = strings.ToUpper(strings.TrimRight(refresh, "="))
	}

	return
}
