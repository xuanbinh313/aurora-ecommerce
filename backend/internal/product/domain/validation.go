package domain

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

func ParseValidationErrors(err error, obj interface{}) map[string]string {
	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		errs := make(map[string]string)
		// reflect Type của object
		t := reflect.TypeOf(obj)
		if t.Kind() == reflect.Ptr {
			t = t.Elem()
		}
		for _, fe := range ve {
			field, _ := t.FieldByName(fe.StructField())
			jsonTag := field.Tag.Get("json")
			jsonField := strings.Split(jsonTag, ",")[0] // chỉ lấy tên, bỏ omitempty,...

			// fallback nếu json tag không có
			if jsonField == "" {
				jsonField = strings.ToLower(fe.Field())
			}
			switch fe.Tag() {
			case "required":
				errs[jsonField] = "this field is required"
			case "email":
				errs[jsonField] = "this field must be a valid email"
			case "min":
				errs[jsonField] = fmt.Sprintf("this field must be at least %s characters", fe.Param())
			case "max":
				errs[jsonField] = fmt.Sprintf("this field must be at most %s characters", fe.Param())
			default:
				errs[jsonField] = "this field is required"
			}
		}
		return errs
	}
	return nil
}
