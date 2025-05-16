package infra

import (
	"ecommerce/internal/common"
	"ecommerce/internal/upload/domain"

	"gorm.io/gorm"
)

type UploadRepository struct {
	*common.BaseRepository[domain.Media]
}

func NewUploadRepository(db *gorm.DB) *UploadRepository {
	return &UploadRepository{
		BaseRepository: common.NewBaseRepository[domain.Media](db),
	}
}
