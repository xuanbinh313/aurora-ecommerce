package common

import "fmt"

type AppError struct {
	Code    string
	Message string
	Status  int
	Err     error
}

func (e *AppError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("[%s] %s: %v", e.Code, e.Message, e.Err)
	}
	return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

func (e *AppError) Unwrap() error {
	return e.Err
}

func NewAppError(code string, msg string, status int, err error) *AppError {
	return &AppError{Code: code, Message: msg, Status: status, Err: err}
}

// Predefined common errors
var (
	ErrNotFound          = NewAppError("NOT_FOUND", "resource not found", 404, nil)
	ErrInvalidInput      = NewAppError("INVALID_INPUT", "invalid input", 400, nil)
	ErrInternalServer    = NewAppError("INTERNAL_ERROR", "internal server error", 500, nil)
	ErrUnauthorized      = NewAppError("UNAUTHORIZED", "unauthorized", 401, nil)
	ErrDuplicateResource = NewAppError("DUPLICATE", "resource already exists", 409, nil)
)
