package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rzkinr/backend-porto/handlers"
	"github.com/rzkinr/backend-porto/middleware"
)

func SetupRoutes(r *gin.Engine) {
	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://rzkinr.github.io"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		//public routes
		api.POST("/login", handlers.Login)
		api.GET("/projects", handlers.GetProjects)
		api.GET("/projects/:id", handlers.GetProjectByID)
		api.GET("/blogs", handlers.GetBlogs)
		api.GET("/blogs/:slug", handlers.GetBlogBySlug)
		api.POST("/contacts", handlers.CreateContact)

		admin := api.Group("/admin")
		admin.Use(middleware.AuthMiddleware())
		{
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