package middleware

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter/v3"
	"github.com/ulule/limiter/v3/drivers/store/memory"
)

func RateLimitMiddleware(maxRequests int, period time.Duration) gin.HandlerFunc {
	rate := limiter.Rate{
		Period: period,
		Limit:  int64(maxRequests),
	}
	store := memory.NewStore()
	instance := limiter.New(store, rate)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		context, err := instance.Get(c, ip)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Rate limit error"})
			c.Abort()
			return
		}

		c.Header("X-RateLimit-Limit", string(rune(context.Limit)))
		c.Header("X-RateLimit-Remaining", string(rune(context.Remaining)))

		if context.Reached {
			c.JSON(http.StatusTooManyRequests, gin.H{"error": "Too many requests, please try again later"})
			c.Abort()
			return
		}

		c.Next()
	}
}