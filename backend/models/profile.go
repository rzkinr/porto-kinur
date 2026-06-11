package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Profile struct {
	bun.BaseModel `bun:"table:profiles,alias:p"`

	ID		int64      `bun:"id,pk,autoincrement" json:"id"`
	Bio1	string    `bun:"bio1" json:"bio1"`
	Bio2	string    `bun:"bio2" json:"bio2"`
	Tagline	string    `bun:"tagline" json:"tagline"`
	Location	string    `bun:"location" json:"location"`
	Email	string    `bun:"email" json:"email"`
	Github	string    `bun:"github" json:"github"`
	Linkedin	string    `bun:"linkedin" json:"linkedin"`
	UpdatedAt	time.Time `bun:"updated_at,nullzero,nullzero,default:current_timestamp" json:"updated_at"`
}