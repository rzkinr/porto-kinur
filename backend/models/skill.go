package models

type Skill struct {
	ID		uint   `gorm:"primaryKey" json:"id"`
	Category	string `json:"category"`
	Items		string `json:"items"`
	Order		int    `json:"order"`
}