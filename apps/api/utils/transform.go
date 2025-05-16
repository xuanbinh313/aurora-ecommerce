package utils

import (
	"ecommerce/internal/category/domain"
	"ecommerce/internal/db"
	"fmt"

	"github.com/gosimple/slug"
)

// Hàm tạo slug duy nhất
func generateUniqueSlug(name string) string {
	baseSlug := slug.Make(name)
	uniqueSlug := baseSlug
	counter := 1

	// Kiểm tra nếu slug đã tồn tại
	for {
		var existing domain.Category
		err := db.Where("slug = ?", uniqueSlug).First(&existing).Error
		if err != nil {
			// Không tìm thấy, slug là duy nhất
			break
		}

		// Nếu tồn tại, thêm số đếm vào slug
		counter++
		uniqueSlug = fmt.Sprintf("%s-%d", baseSlug, counter)
	}

	return baseSlug
}
