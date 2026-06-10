package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetSkills(c *gin.Context) {
	var skills []models.Skill
	config.DB.Order("sort_order asc").Find(&skills)
	c.JSON(http.StatusOK, gin.H{"data": skills})
}

func CreateSkill(c *gin.Context) {
	var input models.Skill

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Create(&input)
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func UpdateSkill(c *gin.Context) {
	id := c.Param("id")
	var skill models.Skill

	if err := config.DB.First(&skill, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
		return
	}

	if err := c.ShouldBindJSON(&skill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&skill)
	c.JSON(http.StatusOK, gin.H{"data": skill})
}

func DeleteSkill(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB.Delete(&models.Skill{}, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Skill deleted successfully"})
}