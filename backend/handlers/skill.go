package handlers

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetSkills(c *gin.Context) {
	var skills []models.Skill
	if err := config.DB.NewSelect().Model(&skills).OrderExpr("sort_order ASC").Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": skills})
}

func CreateSkill(c *gin.Context) {
	var input models.Skill

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

func UpdateSkill(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var skill models.Skill

	if err := config.DB.NewSelect().Model(&skill).Where("id = ?", id).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
		return
	}

	if err := c.ShouldBindJSON(&skill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := config.DB.NewUpdate().Model(&skill).WherePK().Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": skill})
}

func DeleteSkill(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	if _, err := config.DB.NewDelete().Model((*models.Skill)(nil)).Where("id = ?", id).Exec(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Skill not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Skill deleted successfully"})
}