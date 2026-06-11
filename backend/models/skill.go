package models

import "github.com/uptrace/bun"

type Skill struct {
	bun.BaseModel `bun:"table:skills,alias:s"`

	ID		int64   `bun:"id,pk,autoincrement" json:"id"`
	Category	string `bun:"category" json:"category"`
	Items		string `bun:"items" json:"items"`
	SortOrder		int    `bun:"sort_order" json:"sort_order"`
}