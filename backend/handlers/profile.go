package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetProfile(c *gin.Context) {
	var profile models.Profile
	result := config.DB.First(&profile)

	if result.Error != nil {
		c.JSON(http.StatusOK, gin.H{"data": models.Profile{}})
	}
	c.JSON(http.StatusOK, gin.H{"data": profile})
}

func UpdateProfile(c *gin.Context) {
	var input models.Profile

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var profile models.Profile
	config.DB.First(&profile)

	if profile.ID == 0 {
		config.DB.Create(&input)
	} else {
		input.ID = profile.ID
		config.DB.Save(&input)
	}

	c.JSON(http.StatusOK, gin.H{"data": input})
}