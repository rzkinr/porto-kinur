package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func CreateContact(c *gin.Context) {
	var input models.Contact

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := config.DB.Create(&input)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Contact created successfully",
		"data":    input,
	})
}

func GetContacts(c *gin.Context) {
	var contacts []models.Contact
	config.DB.Order("created_at desc").Find(&contacts)
	c.JSON(http.StatusOK, gin.H{"data": contacts})
}