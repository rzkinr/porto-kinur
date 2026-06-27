package routes

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/handlers"
	"github.com/rzkinr/backend-porto/middleware"
)

func SetupRoutes(r *gin.Engine) {
	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://rzkinr.github.io", "https://kinur.my.id", "https://www.kinur.my.id",},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.POST("/login", middleware.RateLimitMiddleware(5, time.Minute), handlers.Login)
		api.POST("/contact", middleware.RateLimitMiddleware(3, time.Minute), handlers.CreateContact)


		//public routess
		api.GET("/projects", handlers.GetProjects)
		api.GET("/projects/:id", handlers.GetProjectByID)
		api.GET("/blogs", handlers.GetBlogs)
		api.GET("/blogs/:slug", handlers.GetBlogBySlug)
		api.GET("/blogs/:slug/related", handlers.GetRelatedBlogs)
		api.GET("/profile", handlers.GetProfile)
		api.GET("/skills", handlers.GetSkills)
		api.GET("/certifications", handlers.GetCertifications)

		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware())
		{
			admin.PUT("/profile", handlers.UpdateProfile)
			
			admin.POST("/skills", handlers.CreateSkill)
			admin.PUT("/skills/:id", handlers.UpdateSkill)
			admin.DELETE("/skills/:id", handlers.DeleteSkill)

			admin.POST("/certifications", handlers.CreateCertification)
			admin.PUT("/certifications/:id", handlers.UpdateCertification)
			admin.DELETE("/certifications/:id", handlers.DeleteCertification)
			
			//project routes
			admin.POST("/projects", handlers.CreateProject)
			admin.PUT("/projects/:id", handlers.UpdateProject)
			admin.DELETE("/projects/:id", handlers.DeleteProject)

			//blog routes
			admin.POST("/blogs", handlers.CreateBlog)
			admin.PUT("/blogs/:slug", handlers.UpdateBlog)
			admin.DELETE("/blogs/:slug", handlers.DeleteBlog)

			//message routes
			admin.GET("/messages", handlers.GetContacts)
		}	
	}
}