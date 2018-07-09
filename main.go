package main

import (
	_ "lq-center-go/models"
	_ "lq-center-go/routers"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/lib/pq"
)

func initSQL() {
	user := beego.AppConfig.String("mysqluser")
	pass := beego.AppConfig.String("mysqlpass")
	url := beego.AppConfig.String("mysqlurls")
	name := beego.AppConfig.String("mysqldb")

	orm.RegisterDriver("postgres", orm.DRMySQL)
	orm.RegisterDataBase("default", "postgres", "postgres://"+user+":"+pass+"@"+url+"/"+name+"?sslmode=disable")
	orm.RunSyncdb("default", false, true)
}

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	initSQL()
	beego.Run()
}
