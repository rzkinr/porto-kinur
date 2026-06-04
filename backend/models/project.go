package models

import "time"

type Project struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Tech 		string		`json:"tech"`
	Github 		string 		`json:"github"`
	Demo 		string `json:"demo"`
	Status 		string `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

