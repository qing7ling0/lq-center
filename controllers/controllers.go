package controllers

// Response struct
type Response struct {
	code    int
	message string
	data    interface{}
}

// Define common vars
var (
	ResponseError = &Response{code: -1, message: "请求失败"}
)

// Error2Response 返回失败的 Response
func Error2Response(err error) *Response {
	return &Response{code: -1, message: err.Error()}
}

// Success2Response 返回成功的 Response
func Success2Response(data interface{}) *Response {
	return &Response{code: 0, data: data}
}

// CreateResponse 创建一个 Response
func CreateResponse(code int, message string, data interface{}) *Response {
	return &Response{code, message, data}
}
