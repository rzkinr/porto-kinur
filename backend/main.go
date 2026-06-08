package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/models"
	"github.com/rzkinr/backend-porto/routes"
)

func main() {
	godotenv.Load()
	config.ConnectDatabase()

	config.DB.AutoMigrate(
		&models.Blog{}, 
		&models.Project{}, 
		&models.Contact{},
	)

	r := gin.Default()
	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Log the server start message with the port number
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}