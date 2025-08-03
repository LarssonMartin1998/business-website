/*
Package config ...
*/
package config

import (
	"backend/utils"
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
	Key string
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
			Path:         utils.Must(getEnvWithoutDefault("DB_PATH")),
			WALMode:      getBoolEnv("DB_WAL_MODE", true),
			TimeoutSecs:  getIntEnv("DB_TIMEOUT", 30),
			MaxOpenConns: getIntEnv("DB_MAX_OPEN_CONNS", 5),
			MaxIdleConns: getIntEnv("DB_MAX_IDLE_CONNS", 2),
		},
		API: APIConfig{
			Key: utils.Must(getEnvWithoutDefault("API_KEY")),
		},
		Server: ServerConfig{
			AllowedOrigins: utils.Must(getSliceEnvWithoutDefault("ALLOWED_ORIGINS")),
			RateLimit:      getIntEnv("RATE_LIMIT", 60),
		},
	}

	if err := config.validate(); err != nil {
		return nil, err
	}

	return config, nil
}

func (c *Config) validate() error {
	if c.Database.Path == "" {
		return fmt.Errorf("missing required config entry: DB_PATH")
	}

	if c.API.Key == "" {
		return fmt.Errorf("missing required config entry: API_KEY")
	}

	if c.Server.AllowedOrigins == nil || len(c.Server.AllowedOrigins) == 0 {
		return fmt.Errorf("missing required config entry: ALLOWED_ORIGINS")
	}

	return nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvWithoutDefault(key string) (string, error) {
	value := os.Getenv(key)
	if value == "" {
		return "", fmt.Errorf("Required environment variable %s is not set", key)
	}
	return value, nil
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

func getSliceEnvWithoutDefault(key string) ([]string, error) {
	value, err := getEnvWithoutDefault(key)
	if err != nil {
		return nil, err
	}

	parts := strings.Split(value, ",")
	result := make([]string, len(parts))
	for i, part := range parts {
		result[i] = strings.TrimSpace(part)
	}

	return result, nil
}
