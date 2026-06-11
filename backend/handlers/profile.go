package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetProfile(c *gin.Context) {
	var profile models.Profile
	if err := config.DB.NewSelect().Model(&profile).Scan(context.Background()); err != nil {
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
	if err := config.DB.NewSelect().Model(&profile).Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if profile.ID == 0 {
		if _, err := config.DB.NewInsert().Model(&input).Exec(context.Background()); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		input.ID = profile.ID
		if _, err := config.DB.NewUpdate().Model(&input).WherePK().Exec(context.Background()); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": input})
}