package handlers

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
)

func GetBlogs(c *gin.Context) {
	var blogs []models.Blog
	if err := config.DB.NewSelect().Model(&blogs).OrderExpr("created_at DESC").Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": blogs})
}

func GetBlogBySlug(c *gin.Context) {
	slug := c.Param("slug")
	var blog models.Blog

	if err := config.DB.NewSelect().Model(&blog).Where("slug = ?", slug).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	//increament view count
	config.DB.NewUpdate().Model((*models.Blog)(nil)).
		Set("views = views + 1").
		Where("slug = ?", slug).
		Exec(context.Background())
	
	blog.Views++ // reflect the incremented view count in the response

	c.JSON(http.StatusOK, gin.H{"data": blog})
}

func CreateBlog(c *gin.Context) {
	var input models.Blog

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.CreatedAt = time.Now()

	if _, err := config.DB.NewInsert().Model(&input).Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": input})
}

func UpdateBlog(c *gin.Context) {
	slug := c.Param("slug")
	var blog models.Blog

	if err := config.DB.NewSelect().Model(&blog).Where("slug = ?", slug).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := config.DB.NewUpdate().Model(&blog).WherePK().Exec(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": blog})
}

func DeleteBlog(c *gin.Context) {
	slug := c.Param("slug")
	if _, err := config.DB.NewDelete().Model((*models.Blog)(nil)).Where("slug = ?", slug).Exec(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted"})
}

func GetRelatedBlogs(c *gin.Context) {
	slug := c.Param("slug")

	//ambil blog berdasarkan slug
	var current models.Blog
	if err := config.DB.NewSelect().Model(&current).Where("slug = ?", slug).Scan(context.Background()); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	// ambil semua blog lain
	var blogs []models.Blog
	if err := config.DB.NewSelect().
	Model(&blogs).
	Where("slug != ?", slug).
	OrderExpr("created_at DESC").
	Limit(6).
	Scan(context.Background()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//filter berdasarkan tag yang sama
	currentTags := strings.Split(current.Tags, ",")
	var related []models.Blog
	for _, b := range blogs {
		blogTags := strings.Split(b.Tags, ",")
		for _, ct := range currentTags {
			for _, bt := range blogTags {
				if strings.TrimSpace(ct) == strings.TrimSpace(bt) {
					related = append(related, b)
					goto next
				}
			}
		}
	next:
		if len(related) >= 3 {
			break
		}
	}

	// Kalau kurang dari 3, tambahkan post lain
	if len(related) < 3 {
		for _, b := range blogs {
			found := false
			for _, r := range related {
				if r.ID == b.ID {
					found = true
					break
				}
			}
			if !found {
				related = append(related, b)
			}
			if len(related) >= 3 {
				break
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": related})
}