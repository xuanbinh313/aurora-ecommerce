package utils

import (
	"encoding/json"
	"fmt"
	"strconv"
)

type Float64Custom struct {
	Value *float64
}

func (f *Float64Custom) UnmarshalJSON(data []byte) error {
	s := string(data)
	// Nếu null hoặc empty string, trả về nil
	if s == "null" || s == `""` {
		f.Value = nil
		return nil
	}

	// Thử unmarshal float64 trực tiếp
	var num float64
	if err := json.Unmarshal(data, &num); err == nil {
		f.Value = &num
		return nil
	}

	// Thử unmarshal string rồi parse float64
	var str string
	if err := json.Unmarshal(data, &str); err == nil {
		if str == "" {
			f.Value = nil
			return nil
		}
		parsed, err := strconv.ParseFloat(str, 64)
		if err != nil {
			return err
		}
		f.Value = &parsed
		return nil
	}

	return fmt.Errorf("cannot unmarshal %s into Float64Custom", s)
}
