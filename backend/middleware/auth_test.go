package middleware

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestAuthMiddleware_NoToken(t *testing.T) {
	gin.SetMode(gin.TestMode)
	os.Setenv("JWT_SECRET", "test-secret")

	r := gin.New()
	r.Use(AuthMiddleware())
	r.GET("/protected", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	})

	req, _ := http.NewRequest("GET", "/protected", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
}

func TestAuthMiddleware_InvalidToken(t *testing.T) {
	gin.SetMode(gin.TestMode)
	os.Setenv("JWT_SECRET", "test-secret")

	r := gin.New()
	r.Use(AuthMiddleware())
	r.GET("/protected", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	})

	req, _ := http.NewRequest("GET", "/protected", nil)
	req.Header.Set("Authorization", "Bearer invalid-token")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code)
}