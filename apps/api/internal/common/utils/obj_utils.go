package utils

import (
	"reflect"
	"strings"
)

func GetJSONFieldName(obj interface{}, fieldName string) string {
	t := reflect.TypeOf(obj)
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	if f, ok := t.FieldByName(fieldName); ok {
		jsonTag := f.Tag.Get("json")
		if jsonTag != "" {
			return strings.Split(jsonTag, ",")[0]
		}
	}
	return strings.ToLower(fieldName)
}
