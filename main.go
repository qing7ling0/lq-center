package main

import (
	"fmt"
	_ "lq-center-go/models"
	_ "lq-center-go/routers"

	_ "lq-center-go/oauth2"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/plugins/cors"
	_ "github.com/lib/pq"
)

func initSQL() {
	fmt.Println("----------initSQL start----------")
	user := beego.AppConfig.String("mysqluser")
	pass := beego.AppConfig.String("mysqlpass")
	url := beego.AppConfig.String("mysqlurls")
	name := beego.AppConfig.String("mysqldb")

	orm.RegisterDriver("postgres", orm.DRMySQL)
	orm.RegisterDataBase("default", "postgres", "postgres://"+user+":"+pass+"@"+url+"/"+name+"?sslmode=disable")
	orm.RunSyncdb("default", false, true)
	fmt.Println("----------initSQL end----------")
}

func test() {
	fmt.Println("----------test start----------")

	fmt.Println("----------test end----------")
}

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
		AllowCredentials: true,
	}))
	initSQL()
	test()
	beego.Run()
}
