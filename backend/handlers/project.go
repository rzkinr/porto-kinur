package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func CreateProject(c *gin.Context) {
	var input models.Project

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Create(&input)	
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func UpdateProject(c *gin.Context) {
	id := c.Param("id")
	var project models.Project

	if err := config.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	config.DB.Save(&project)
	c.JSON(http.StatusOK, gin.H{"data": project})
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB.Delete(&models.Project{}, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Project deleted"})
}

func GetProjects(c *gin.Context) {
	var projects []models.Project
	config.DB.Order("created_at desc").Find(&projects)
	c.JSON(http.StatusOK, gin.H{"data": projects})
}

func GetProjectByID(c *gin.Context) {
	id:= c.Param("id")
	var project models.Project

	if err := config.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": project})
}