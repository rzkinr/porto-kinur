package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetCertifications(c *gin.Context) {
	var certifications []models.Certification
	config.DB.Order("order asc").Find(&certifications)
	c.JSON(http.StatusOK, gin.H{"data": certifications})
}

func CreateCertification(c *gin.Context) {
	var input models.Certification

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Create(&input)
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func UpdateCertification(c *gin.Context) {
	id := c.Param("id")
	var certification models.Certification

	if err := config.DB.First(&certification, id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
		return
	}

	if err := c.ShouldBindJSON(&certification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&certification)
	c.JSON(http.StatusOK, gin.H{"data": certification})
}

func DeleteCertification(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB.Delete(&models.Certification{}, id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Certification deleted successfully"})
}