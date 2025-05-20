package common

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ApplyPaginationQuery[T any](db *gorm.DB, model *T, query PaginationQuery, out *[]T) (PaginationResponse[[]T], error) {
	if query.Page < 1 {
		query.Page = 1
	}
	if query.Limit < 1 {
		query.Limit = 10
	}
	if query.Order != "asc" && query.Order != "desc" {
		query.Order = "desc"
	}
	offset := (query.Page - 1) * query.Limit

	// Bắt đầu truy vấn
	dbQuery := db.Model(model)

	// Apply preloads
	for _, preload := range query.Preloads {
		dbQuery = dbQuery.Preload(preload)
	}
	// Thêm điều kiện tìm kiếm nếu có
	if query.Search != "" && len(query.SearchFields) > 0 {
		// Tạo điều kiện OR cho các trường
		conditions := make([]string, 0)
		values := make([]interface{}, 0)

		for _, field := range query.SearchFields {
			conditions = append(conditions, fmt.Sprintf("%s ILIKE ?", field))
			values = append(values, "%"+query.Search+"%")
		}
		dbQuery = dbQuery.Where(strings.Join(conditions, " OR "), values...)
	}

	// Đếm tổng
	var total int64
	dbQuery.Count(&total)

	// Sắp xếp và phân trang
	if query.SortBy != "" {
		orderClause := fmt.Sprintf("%s %s", query.SortBy, query.Order)
		dbQuery = dbQuery.Order(orderClause)
	}
	dbQuery = dbQuery.Limit(query.Limit).Offset(offset)

	// Lấy dữ liệu
	if err := dbQuery.Find(out).Error; err != nil {
		return PaginationResponse[[]T]{}, err
	}

	// Trả về response
	return PaginateResponse(*out, query.Page, query.Limit, total), nil
}

func GetIntQuery(c *gin.Context, key string, defaultVal int) int {
	valStr := c.DefaultQuery(key, fmt.Sprintf("%d", defaultVal))
	val, err := strconv.Atoi(valStr)
	if err != nil {
		return defaultVal
	}
	return val
}
