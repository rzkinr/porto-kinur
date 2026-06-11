package models

import (
	"time"

	"github.com/uptrace/bun"
)

type Certification struct {
	bun.BaseModel `bun:"table:certifications,alias:c"`

	ID		int64      `bun:"id,pk,autoincrement" json:"id"`
	Name	string    `bun:"name" json:"name"`
	Issuer	string    `bun:"issuer" json:"issuer"`
	Year	string    `bun:"year" json:"year"`
	CertID	string    `bun:"cert_id" json:"cert_id"`
	CreatedAt	time.Time `bun:"created_at,nullzero,nullzero,default:current_timestamp" json:"created_at"`
}