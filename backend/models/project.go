package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Project struct {
	bun.BaseModel `bun:"table:projects,alias:p"`

	ID          int64     `bun:"id,pk,autoincrement" json:"id"`
	Title       string    `bun:"title,notnull" json:"title"`
	Description string    `bun:"description" json:"description"`
	Tech 		string		`bun:"tech" json:"tech"`
	Github 		string 		`bun:"github" json:"github"`
	Demo 		string `bun:"demo" json:"demo"`
	Status 		string `bun:"status" json:"status"`
	CreatedAt   time.Time `bun:"created_at,notnull,nullzero,default:current_timestamp" json:"created_at"`
}

