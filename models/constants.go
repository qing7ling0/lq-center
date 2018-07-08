package models

// Type RegisterStatus
type RegisterStatus int

// Enum RegisterStatus
const (
	Success = iota
	Error
	ErrorAccountOrPasswordNotVaild
	ErrorAccountNull
	ErrorAccountExsit
)

// IDNull 为空的ID
const IDNull int64 = 0
