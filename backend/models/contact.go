package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Contact struct {
	bun.BaseModel `bun:"table:contacts,alias:c"`

	ID		int64      `bun:"id,pk,autoincrement" json:"id"`
	Name	string    `bun:"name,notnull" json:"name"`
	Email	string    `bun:"email,notnull" json:"email"`
	Message	string    `bun:"message,notnull" json:"message"`
	CreatedAt time.Time `bun:"created_at,notnull,nullzero,default:current_timestamp" json:"created_at"`
}