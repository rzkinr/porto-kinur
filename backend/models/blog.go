package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Blog struct {
	bun.BaseModel `bun:"table:blogs,alias:b"`

	ID          int64     `bun:"id,pk,autoincrement" json:"id"`
	Title       string    `bun:"title,notnull" json:"title"`
	Slug		string    `bun:"slug,notnull" json:"slug"`
	Excerpt     string    `bun:"excerpt" json:"excerpt"`
	Content     string    `bun:"content" json:"content"`
	Tags        string    `bun:"tags" json:"tags"`
	ReadTime    string    `bun:"read_time" json:"read_time"`
	Views	    int64     `bun:"views,default:0" json:"views"` 
	CreatedAt   time.Time `bun:"created_at,notnull,nullzero,default:current_timestamp" json:"created_at"`
}
