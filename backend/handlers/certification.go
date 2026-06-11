package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetCertifications(c *gin.Context) {
	var certifications []models.Certification
	if err := config.DB.NewSelect().Model(&certifications).OrderExpr("created_at ASC").Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": certifications})
}

func CreateCertification(c *gin.Context) {
	var input models.Certification
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

func UpdateCertification(c *gin.Context) {
	id := c.Param("id")
	var certification models.Certification

	if err := config.DB.NewSelect().Model(&certification).Where("id = ?", id).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
		return
	}

	if err := c.ShouldBindJSON(&certification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := config.DB.NewUpdate().Model(&certification).WherePK().Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": certification})
}

func DeleteCertification(c *gin.Context) {
	id := c.Param("id")
	if _, err := config.DB.NewDelete().Model((*models.Certification)(nil)).Where("id = ?", id).Exec(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Certification not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Certification deleted successfully"})
}