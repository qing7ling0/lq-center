package errors

type LQError struct {
	code    int
	message string
}

func create(code int, message string) LQError {
	return &LQError{code: code, message: message}
}

func (e *LQError) Error() string {
	return e.message
}
