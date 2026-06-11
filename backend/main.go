package main

import (
	"context"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/rzkinr/backend-porto/config"
	"github.com/rzkinr/backend-porto/migrations"
	"github.com/rzkinr/backend-porto/routes"
	"github.com/uptrace/bun/migrate"
)

func main() {
	godotenv.Load()
	config.ConnectDatabase()

	// Run migrations
	migrator := migrate.NewMigrator(config.DB, migrations.Migrations)
	if err := migrator.Init(context.Background()); err != nil {
		log.Fatal("Failed to init migrator:", err)
	}

	group, err := migrator.Migrate(context.Background())
	if err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	if group.IsZero() {
		log.Println("No new migrations to run")
	} else {
		log.Printf("Migrated to %s", group)
	}

	r := gin.Default()
	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}