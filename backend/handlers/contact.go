package handlers

import (
	"context"
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

	if _, err := config.DB.NewInsert().Model(&input).Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create contact"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Contact created successfully",
		"data":    input,
	})
}

func GetContacts(c *gin.Context) {
	var contacts []models.Contact
	if err := config.DB.NewSelect().Model(&contacts).OrderExpr("created_at DESC").Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": contacts})
}