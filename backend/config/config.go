/*
Package config ...
*/
package config

import (
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	Database DatabaseConfig
	API      APIConfig
	Server   ServerConfig
}

type DatabaseConfig struct {
	Path       string
	WALMode    bool
	Timeout    int
	BackupPath string
}

type APIConfig struct {
	Key      string
	AdminKey string
}

type ServerConfig struct {
	AllowedOrigins []string
	RateLimit      int
}

func MustLoad() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := &Config{
		Port: getEnv("PORT", "8080"),
		Database: DatabaseConfig{
			Path:       mustGetEnv("DB_PATH"),
			WALMode:    getBoolEnv("DB_WAL_MODE", true),
			Timeout:    getIntEnv("DB_TIMEOUT", 30),
			BackupPath: getEnv("BACKUP_PATH", ""),
		},
		API: APIConfig{
			Key:      mustGetEnv("API_KEY"),
			AdminKey: mustGetEnv("ADMIN_API_KEY"),
		},
		Server: ServerConfig{
			AllowedOrigins: getSliceEnv("ALLOWED_ORIGINS", []string{}),
			RateLimit:      getIntEnv("RATE_LIMIT", 60),
		},
	}

	config.validate()
	return config
}

func (c *Config) validate() {
	// Ensure database directory exists
	dir := filepath.Dir(c.Database.Path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		log.Fatalf("Failed to create database directory %s: %v", dir, err)
	}

	// Ensure backup directory exists (if specified)
	if c.Database.BackupPath != "" {
		if err := os.MkdirAll(c.Database.BackupPath, 0755); err != nil {
			log.Fatalf("Failed to create backup directory %s: %v", c.Database.BackupPath, err)
		}
	}

	// Validate required fields
	if c.API.Key == "" {
		log.Fatal("API_KEY is required")
	}
	if c.API.AdminKey == "" {
		log.Fatal("ADMIN_API_KEY is required")
	}
	if len(c.Server.AllowedOrigins) == 0 {
		log.Fatal("ALLOWED_ORIGINS is required")
	}
}

// Helper functions
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func mustGetEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Required environment variable %s is not set", key)
	}
	return value
}

func getBoolEnv(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		parsed, err := strconv.ParseBool(value)
		if err != nil {
			log.Fatalf("Invalid boolean value for %s: %s", key, value)
		}
		return parsed
	}
	return defaultValue
}

func getIntEnv(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		parsed, err := strconv.Atoi(value)
		if err != nil {
			log.Fatalf("Invalid integer value for %s: %s", key, value)
		}
		return parsed
	}
	return defaultValue
}

func getSliceEnv(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		// Split by comma and trim whitespace
		parts := strings.Split(value, ",")
		result := make([]string, len(parts))
		for i, part := range parts {
			result[i] = strings.TrimSpace(part)
		}
		return result
	}
	return defaultValue
}
