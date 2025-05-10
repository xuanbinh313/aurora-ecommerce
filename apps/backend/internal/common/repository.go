package common

import "gorm.io/gorm"

// BaseRepository defines common CRUD methods
type BaseRepository[T any] struct {
	db *gorm.DB
}

// NewBaseRepository creates a new BaseRepository
func NewBaseRepository[T any](db *gorm.DB) *BaseRepository[T] {
	return &BaseRepository[T]{db: db}
}

// Create an entity
func (r *BaseRepository[T]) Create(entity *T) error {
	return r.db.Create(entity).Error
}

// FindAll finds all entities
func (r *BaseRepository[T]) Find() ([]T, error) {
	var entities []T
	err := r.db.Find(&entities).Error
	return entities, err
}

// FindById finds an entity by ID
func (r *BaseRepository[T]) FindById(id uint) (*T, error) {
	var entity T
	err := r.db.First(&entity, id).Error
	return &entity, err
}

// Update an entity
func (r *BaseRepository[T]) Update(entity *T) error {
	return r.db.Save(entity).Error
}

// Delete an entity by ID
func (r *BaseRepository[T]) Delete(id uint) (*T, error) {
	var entity T
	err := r.db.Delete(new(T), id).Error
	return &entity, err
}
