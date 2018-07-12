package controllers

// Response struct
type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// Define common vars
var (
	ResponseError = &Response{Code: -1, Message: "请求失败！"}
)

// Error2Response 返回失败的 Response
func Error2Response(err error) *Response {
	if err == nil {
		return &Response{Code: -1, Message: "请求失败！"}
	}
	return &Response{Code: -1, Message: err.Error()}
}

// Success2Response 返回成功的 Response
func Success2Response(data interface{}) *Response {
	return &Response{Code: 0, Data: data}
}

// CreateResponse 创建一个 Response
func CreateResponse(code int, message string, data interface{}) *Response {
	return &Response{Code: code, Message: message, Data: data}
}
