package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "Login",
			Router: `/login`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "LoginCheck",
			Router: `/login-check`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "LoginByToken",
			Router: `/login_token`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "Profile",
			Router: `/profile/:uid`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "ProfileByToken",
			Router: `/profile_token/:token`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "RefreshToken",
			Router: `/refresh`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "Register",
			Router: `/register`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "ResetPassword",
			Router: `/resetpw`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "ResetPasswordToken",
			Router: `/resetpw_token`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "Token",
			Router: `/token`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["lq-center-go/controllers:UserController"] = append(beego.GlobalControllerRouter["lq-center-go/controllers:UserController"],
		beego.ControllerComments{
			Method: "UserUpdate",
			Router: `/update`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

}
