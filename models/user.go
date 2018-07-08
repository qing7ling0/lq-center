package models

import (
	"errors"
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql" // import your used driver
)

// User Model Struct
type User struct {
	Id            int
	account       string `orm:"size(40);unique"`
	password      string `orm:"size(40)"`
	channel       uint32
	lastLoginIP   string       `orm:"size(50)"`
	lastLoginTime time.Time    `orm:"type(datetime)"`
	profile       *UserProfile `orm:"null;rel(one)"`
	createdTime   time.Time    `orm:"auto_now_add;type(datetime)"`
	updatedTime   time.Time    `orm:"auto_now;type(datetime)"`
}

// UserProfile Mode Struct
type UserProfile struct {
	Id          int
	name        string    `orm:"size(100)"`
	phone       string    `orm:"size(20)"`
	sex         byte      `orm:"default(0)"`
	address     string    `orm:"size(100)"`
	createdTime time.Time `orm:"auto_now_add;type(datetime)"`
	updatedTime time.Time `orm:"auto_now;type(datetime)"`
}

func init() {
	// register model
	orm.RegisterModel(new(User), new(UserProfile))
}

func register(account string, password string, channel uint32) (*User, error) {
	if account == "" {
		return nil, errors.New("账号不能为空")
	}
	o := orm.NewOrm()
	var user User
	user.account = account

	// 检查此账号是否已存在
	if o.Read(&user) == nil {
		user.password = password
		user.channel = channel

		id, err := o.Insert(&user)
		if err == nil {
			var profile UserProfile;
			id, err := o.Insert(&profile)
			
			return &user, nil
		}
	} else {
		return nil, errors.New("账号已存在！")
	}

	return nil, errors.New("注册失败！")
}

func login(account string, password string, channel uint32) *User {
	o := orm.NewOrm()
	user := User{account: account, password: password, channel: channel}

	err := o.Read(&user)

	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
	} else {
	}

	return &user
}

func loginSuccess(id int, ip string) {
	if id == 0 || ip == "" {
		return
	}

	o := orm.NewOrm()
	user := User{Id: id}

	if o.Read(&user) == nil {
		user.lastLoginIP = ip
		user.lastLoginTime = time.Now()
		if num, err := o.Update(&user); err == nil {
			fmt.Println(num)
		}
	}
}
