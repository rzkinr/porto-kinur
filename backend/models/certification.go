package models

import "time"

type Certification struct {
	ID		uint      `gorm:"primaryKey" json:"id"`
	Name	string    `json:"name"`
	Issuer	string    `json:"issuer"`
	Year	string    `json:"year"`
	CertID	string    `json:"cert_id"`
	CreatedAt	time.Time `json:"created_at"`
}