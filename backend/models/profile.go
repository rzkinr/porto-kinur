package models

import "time"

type Profile struct {
	ID		uint      `gorm:"primaryKey" json:"id"`
	Bio1	string    `json:"bio1"`
	Bio2	string    `json:"bio2"`
	Tagline	string    `json:"tagline"`
	Location	string    `json:"location"`
	Email	string    `json:"email"`
	Github	string    `json:"github"`
	Linkedin	string    `json:"linkedin"`
	UpdatedAt	time.Time `json:"updated_at"`
}