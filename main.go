package main

import (
	"fmt"
	_ "lq-center-go/models"
	_ "lq-center-go/routers"
	"net/http"

	_ "github.com/astaxie/beego/cache/redis"

	_ "lq-center-go/oauth2"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego/orm"
	_ "github.com/lib/pq"
)

const (
	headerAllowOrigin      = "Access-Control-Allow-Origin"
	headerAllowCredentials = "Access-Control-Allow-Credentials"
	headerAllowHeaders     = "Access-Control-Allow-Headers"
	headerAllowMethods     = "Access-Control-Allow-Methods"
	headerExposeHeaders    = "Access-Control-Expose-Headers"
	headerMaxAge           = "Access-Control-Max-Age"

	headerOrigin         = "Origin"
	headerRequestMethod  = "Access-Control-Request-Method"
	headerRequestHeaders = "Access-Control-Request-Headers"
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
	// for i := 0; i < 20; i++ {
	// 	logs.Debug("dfasdfa")
	// }
	fmt.Println("----------test end----------")
}

func initLog() {
	fmt.Println("----------initLog start----------")

	logs.SetLogger("console")
	logs.SetLogger(logs.AdapterFile, `{"filename":"logs/log.log", "maxdays":30, "maxlines":500000}`)

	fmt.Println("----------initLog end----------")
}

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}

	var cors = func(ctx *context.Context) {
		origin := ctx.Input.Header(headerOrigin)
		requestedMethod := ctx.Input.Header(headerRequestMethod)
		requestedHeaders := ctx.Input.Header(headerRequestHeaders)

		if origin != "" { //允许访问源
			ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", origin)
		}
		// ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.ResponseWriter.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS")    //允许post访问
		ctx.ResponseWriter.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization") //header的类型
		ctx.ResponseWriter.Header().Set("Access-Control-Max-Age", "1728000")
		ctx.ResponseWriter.Header().Set("Access-Control-Allow-Credentials", "true")
		if ctx.Input.Method() == "OPTIONS" &&
			(requestedMethod != "" || requestedHeaders != "") {
			ctx.ResponseWriter.WriteHeader(http.StatusNoContent)
			return
		}
	}

	beego.InsertFilter("*", beego.BeforeRouter, cors)

	initLog()
	initSQL()
	test()
	logs.Info("app run")
	beego.Run()
}
