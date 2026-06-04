package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetBlogs(c *gin.Context) {
	var blogs []models.Blog
	config.DB.Order("created_at desc").Find(&blogs)
	c.JSON(http.StatusOK, gin.H{"data": blogs})
}

func GetBlogBySlug(c *gin.Context) {
	slug := c.Param("slug")
	var blog models.Blog

	if err := config.DB.Where("slug = ?", slug).First(&blog).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": blog})
}

func CreateBlog(c *gin.Context) {
	var input models.Blog

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Create(&input)	
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func UpdateBlog(c *gin.Context) {
	slug := c.Param("slug")
	var blog models.Blog

	if err := config.DB.Where("slug = ?", slug).First(&blog).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	config.DB.Save(&blog)
	c.JSON(http.StatusOK, gin.H{"data": blog})
}

func DeleteBlog(c *gin.Context) {
	slug := c.Param("slug")
	if err := config.DB.Where("slug = ?", slug).Delete(&models.Blog{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted"})
}