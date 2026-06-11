package handlers

import (
	"context"
	"net/http"
	"strconv"

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

	if _, err := config.DB.NewInsert().Model(&input).Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func UpdateProject(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var project models.Project

	if err := config.DB.NewSelect().Model(&project).Where("id = ?", id).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	project.ID = id
	if _, err := config.DB.NewUpdate().Model(&project).WherePK().Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": project})
}

func DeleteProject(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if _, err := config.DB.NewDelete().Model((*models.Project)(nil)).Where("id = ?", id).Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Project deleted"})
}

func GetProjects(c *gin.Context) {
	var projects []models.Project
	if err := config.DB.NewSelect().Model(&projects).OrderExpr("created_at DESC").Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": projects})
}

func GetProjectByID(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var project models.Project

	if err := config.DB.NewSelect().Model(&project).Where("id = ?", id).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": project})
}