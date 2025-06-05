package utils

import (
	"strconv"

	"github.com/gosimple/slug"
)

// Hàm tạo slug duy nhất
func generateUniqueSlug(name string) string {
	baseSlug := slug.Make(name)
	// uniqueSlug := baseSlug
	// counter := 1

	// Kiểm tra nếu slug đã tồn tại
	// for {
	// 	var existing domain.Category
	// 	err := db.Where("slug = ?", uniqueSlug).First(&existing).Error
	// 	if err != nil {
	// 		// Không tìm thấy, slug là duy nhất
	// 		break
	// 	}

	// 	// Nếu tồn tại, thêm số đếm vào slug
	// 	counter++
	// 	uniqueSlug = fmt.Sprintf("%s-%d", baseSlug, counter)
	// }

	return baseSlug
}

// parsePrice: Hàm xử lý cụ thể cho từng field price
func ParsePrice(rawPrice interface{}) (*float64, error) {
	switch v := rawPrice.(type) {
	case string:
		if v != "" {
			if p, err := strconv.ParseFloat(v, 64); err == nil {
				return &p, nil
			} else {
				return nil, err
			}
		}
		return nil, nil
	case float64:
		return &v, nil
	case int:
		p := float64(v)
		return &p, nil
	default:
		return nil, strconv.ErrSyntax // Giá trị không hợp lệ
	}
}

func ParseUint(rawId interface{}) (uint, error) {
	switch v := rawId.(type) {
	case string:
		if v != "" {
			if id, err := strconv.ParseUint(v, 10, 32); err == nil {
				return uint(id), nil
			} else {
				return 0, err
			}
		}
		return 0, nil
	case float64:
		return uint(v), nil
	case int:
		return uint(v), nil
	default:

		return 0, strconv.ErrSyntax // Giá trị không hợp lệ
	}
}
