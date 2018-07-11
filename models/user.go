package models

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"regexp"
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
	_ "github.com/go-sql-driver/mysql" // import your used driver
)

// User Model Struct
type User struct {
	Id            int64
	Account       string `orm:"size(40)"`
	Password      string `orm:"size(200)"`
	Channel       string
	LastLoginIP   string       `orm:"null;size(50)"`
	LastLoginTime time.Time    `orm:"null;type(datetime)"`
	Profile       *UserProfile `orm:"null;rel(one)"`
	CreatedTime   time.Time    `orm:"auto_now_add;type(datetime)"`
	UpdatedTime   time.Time    `orm:"auto_now;type(datetime)"`
}

// UserProfile Mode Struct
type UserProfile struct {
	Id          int64
	UserId      int64
	Name        string    `orm:"size(100)"`
	Sex         byte      `orm:"default(0)"`
	Phone       string    `orm:"size(20)"`
	Email       string    `orm:"size(20)"`
	Address     string    `orm:"size(100)"`
	CreatedTime time.Time `orm:"auto_now_add;type(datetime)"`
	UpdatedTime time.Time `orm:"auto_now;type(datetime)"`
}

// UserInput 输入
type UserInput struct {
	Account  string `valid:"Required; MaxSize(40); MinSize(5)"`
	Password string `valid:"Required; MaxSize(40); MinSize(5)"`
	Channel  string `valid:"Required"`
}

// RegisterInput 注册输入
type RegisterInput struct {
	Account  string `valid:"Required; MaxSize(40); MinSize(5)"`
	Password string `valid:"Required; MaxSize(40); MinSize(5)"`
	Channel  string `valid:"Required"`
	Type     string
}

func init() {
	// register model
	orm.RegisterModel(new(User), new(UserProfile))
}

// 检查账号密码是否有效
func CheckAccountValid(value string) error {
	if value == "" {
		return ErrAccountPassNull
	}

	validAccount := validation.Validation{}
	validAccount.Match(value, regexp.MustCompile(`^[a-zA-Z0-9_-]*$`), "")

	validEmail := validation.Validation{}
	validEmail.Email(value, "邮箱")

	validPhone := validation.Validation{}
	validPhone.Phone(value, "电话")

	if validAccount.HasErrors() && validEmail.HasErrors() && validPhone.HasErrors() {
		return ErrAccountPassInvalid
	}

	return nil
}

// Register  注册
func Register(userInput *RegisterInput) (*User, error) {
	if userInput == nil {
		return nil, ErrFailed
	}
	if userInput.Account == "" {
		return nil, ErrAccountPassNull
	}
	if userInput.Channel == "" {
		return nil, ErrFailed
	}
	o := orm.NewOrm()
	var user User
	user.Account = userInput.Account

	rdErr := o.Read(&user, "account")
	// 检查此账号是否已存在
	if rdErr == orm.ErrNoRows {
		ha256 := sha256.New()
		ha256.Write([]byte(userInput.Password))
		hashedPass := ha256.Sum(nil)
		user.Password = hex.EncodeToString(hashedPass)
		user.Channel = userInput.Channel

		uid, err2 := o.Insert(&user)
		if err2 == nil {
			profile := UserProfile{UserId: uid}
			_, err2 = o.Insert(&profile)
			fmt.Println(err2)

			retUser := User{Id: uid}
			err2 = o.Read(&retUser)
			fmt.Println(err2)

			if err2 == nil {
				return &retUser, nil
			}

			return nil, ErrRegisterFailed
		}

		fmt.Println(err2)

		return nil, ErrRegisterFailed
	}
	return nil, ErrAccountExsit
}

// Login
// 登陆
func Login(userInput *UserInput) (*User, error) {
	if userInput == nil {
		return nil, ErrFailed
	}
	if userInput.Account == "" {
		return nil, ErrAccountPassNull
	}
	if userInput.Channel == "" {
		return nil, ErrFailed
	}

	valid := validation.Validation{}
	b, err := valid.Valid(userInput)
	if err != nil {
		return nil, ErrAccountPassInvalid
	}
	if !b {
		return nil, ErrFailed
	}

	// 检查账号
	accountErr := CheckAccountValid(userInput.Account)
	if accountErr != nil {
		return nil, accountErr
	}

	// 检查密码
	passErr := CheckAccountValid(userInput.Password)
	if passErr != nil {
		return nil, passErr
	}

	o := orm.NewOrm()
	user := User{Account: userInput.Account, Password: userInput.Password, Channel: userInput.Channel}

	rdErr := o.Read(&user)
	if rdErr == nil {
		LoginSuccess(user.Id, "")

		return &user, nil
	}

	return nil, ErrAccountNotExsit
}

// LoginSuccess 登陆成功
func LoginSuccess(id int64, ip string) {
	if id == 0 || ip == "" {
		return
	}

	o := orm.NewOrm()
	user := User{Id: id}

	if o.Read(&user) == nil {
		user.LastLoginIP = ip
		user.LastLoginTime = time.Now()
		if num, err := o.Update(&user); err == nil {
			fmt.Println(num)
		}
	}
}
