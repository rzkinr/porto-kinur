package models

import "time"

type Blog struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `json:"title"`
	Slug		string    `json:"slug"`
	Excerpt     string    `json:"excerpt"`
	Content     string    `json:"content"`
	Tags        string    `json:"tags"`
	ReadTime    string    `json:"read_time"` 
	CreatedAt   time.Time `json:"created_at"`
}
