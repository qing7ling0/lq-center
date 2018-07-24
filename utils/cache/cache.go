package cache

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/cache"
	_ "github.com/astaxie/beego/cache/redis"
	"github.com/astaxie/beego/logs"
)

var (
	RDCache cache.Cache
	MCache  cache.Cache
)

func init() {
	var err error
	RDCache, err = cache.NewCache("redis", `{"key":"commoncache","conn":"`+beego.AppConfig.String("redisUrl")+`"}`)
	if err != nil {
		logs.Error(err)
	}
	RDCache.ClearAll()

	MCache, err = cache.NewCache("memory", `{"interval":60}`)
	if err != nil {
		logs.Error(err)
	}

	logs.Info("common cache init")
}
