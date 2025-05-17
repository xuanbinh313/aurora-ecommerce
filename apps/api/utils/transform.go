package utils

import (
	"errors"
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
func ParsePrice(priceStr *string) (*float64, error) {
	if priceStr == nil {
		// Không truyền lên -> NULL
		return nil, nil
	}

	// Nếu chuỗi rỗng, trả về NULL
	if *priceStr == "" {
		return nil, nil
	}

	// Cố gắng parse thành float64
	price, err := strconv.ParseFloat(*priceStr, 64)
	if err != nil {
		return nil, errors.New("price is not number")
	}

	return &price, nil
}
