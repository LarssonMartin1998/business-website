/*
Package config ...
*/
package config

import (
	"fmt"
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
	Path         string
	WALMode      bool
	TimeoutSecs  int
	MaxOpenConns int
	MaxIdleConns int
}

type APIConfig struct {
	Key      string
	AdminKey string
}

type ServerConfig struct {
	AllowedOrigins []string
	RateLimit      int
}

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, fmt.Errorf("error loading .env file: %e", err)
	}

	config := &Config{
		Port: getEnv("PORT", "8080"),
		Database: DatabaseConfig{
			Path:         mustGetEnv("DB_PATH"),
			WALMode:      getBoolEnv("DB_WAL_MODE", true),
			TimeoutSecs:  getIntEnv("DB_TIMEOUT", 30),
			MaxOpenConns: getIntEnv("DB_MAX_OPEN_CONNS", 5),
			MaxIdleConns: getIntEnv("DB_MAX_IDLE_CONNS", 2),
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

	if err := config.validate(); err != nil {
		return nil, err
	}

	return config, nil
}

func (c *Config) validate() error {
	dir := filepath.Dir(c.Database.Path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create database directory %s: %v", dir, err)
	}

	if c.API.Key == "" {
	if c.API.AdminKey == "" {
		log.Fatal("ADMIN_API_KEY is required")
		return fmt.Errorf("missing required config entry: API_KEY")
	}

	if len(c.Server.AllowedOrigins) == 0 {
		return fmt.Errorf("missing required config entry: ALLOWED_ORIGINS")
	}

	return nil
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
