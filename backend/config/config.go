/*
Package config ...
*/
package config

import (
	"backend/utils"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	Database DatabaseConfig
	API      APIConfig
	Server   ServerConfig
	Mail     MailConfig
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

type RateLimit struct {
	PerIPLimit    int
	ClearInterval time.Duration
}

type ServerConfig struct {
	AllowedOrigins   []string
	ConnectionsLimit int
	RateLimit        RateLimit
	RequestSizeLimit int64
	ReadTimeout      time.Duration
	WriteTimeout     time.Duration
	IdleTimeout      time.Duration
	HandlerTimeout   time.Duration
}

type MailAuth struct {
	Host string
	Port int
	User string
	Pw   string
}

type MailConfig struct {
	FormSender             string // used for forwarding form submissions to hello@
	FormSenderAuth         MailAuth
	NotificationSender     string // used for sending confirmations to the user if everything was successful (noreply)
	NotificationSenderAuth MailAuth
	NotificationSubject    string
	NotificationBody       string
	Receiver               string // used for receiving the emails from the sender that contains information from the form
}

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, fmt.Errorf("error loading .env file: %w", err)
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
			AllowedOrigins:   getSliceEnv("ALLOWED_ORIGINS", []string{}),
			ConnectionsLimit: getIntEnv("CONNECTIONS_LIMIT", 100),
			RateLimit: RateLimit{
				PerIPLimit:    getIntEnv("RATE_LIMIT", 10),
				ClearInterval: time.Duration(getIntEnv("RATE_LIMIT_CLEAR_INTERVAL_SECS", 60)) * time.Second,
			},
			RequestSizeLimit: 1024 * 10, // 10 KB
			ReadTimeout:      10 * time.Second,
			WriteTimeout:     20 * time.Second,
			IdleTimeout:      60 * time.Second,
			HandlerTimeout:   25 * time.Second,
		},
		Mail: MailConfig{
			FormSender: utils.Must(getEnvWithoutDefault("MAIL_FORM_SENDER")),
			FormSenderAuth: MailAuth{
				Host: utils.Must(getEnvWithoutDefault("MAIL_FORM_SENDER_HOST")),
				Port: getIntEnv("MAIL_FORM_SENDER_PORT", 465),
				User: utils.Must(getEnvWithoutDefault("MAIL_FORM_SENDER_USER")),
				Pw:   utils.Must(getEnvWithoutDefault("MAIL_FORM_SENDER_PW")),
			},
			NotificationSender: utils.Must(getEnvWithoutDefault("MAIL_NOTIFICATION_SENDER")),
			NotificationSenderAuth: MailAuth{
				Host: utils.Must(getEnvWithoutDefault("MAIL_NOTIFICATION_SENDER_HOST")),
				Port: getIntEnv("MAIL_NOTIFICATION_SENDER_PORT", 465),
				User: utils.Must(getEnvWithoutDefault("MAIL_NOTIFICATION_SENDER_USER")),
				Pw:   utils.Must(getEnvWithoutDefault("MAIL_NOTIFICATION_SENDER_PW")),
			},
			NotificationSubject: utils.Must(getEnvWithoutDefault("MAIL_NOTIFICATION_SUBJECT")),
			NotificationBody:    utils.Must(readFileFromEnvPath("MAIL_NOTIFICATION_BODY_FILE")),
			Receiver:            utils.Must(getEnvWithoutDefault("MAIL_RECEIVER")),
		},
	}

	if err := config.validate(); err != nil {
		return nil, err
	}

	return config, nil
}

func (c *Config) validate() error {
	if !utils.IsStringValidEmail(c.Mail.FormSender) {
		return fmt.Errorf("invalid FromSender email in .env")
	}
	if !utils.IsStringValidEmail(c.Mail.NotificationSender) {
		return fmt.Errorf("invalid NotificationSender email in .env")
	}
	if !utils.IsStringValidEmail(c.Mail.Receiver) {
		return fmt.Errorf("invalid Receiver email in .env")
	}
	if !utils.IsStringValidDomain(c.Mail.FormSenderAuth.Host) {
		return fmt.Errorf("invalid FromSenderHost domain in .env")
	}
	if !utils.IsStringValidDomain(c.Mail.NotificationSenderAuth.Host) {
		return fmt.Errorf("invalid NotificationSenderHost domain in .env")
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
		return "", fmt.Errorf("required environment variable %s is not set", key)
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

func getSliceEnv(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		parts := strings.Split(value, ",")
		result := make([]string, len(parts))
		for i, part := range parts {
			result[i] = strings.TrimSpace(part)
		}

		return result
	}

	return defaultValue
}

func readFileFromEnvPath(envPath string) (string, error) {
	relativeFilePath := utils.Must(getEnvWithoutDefault(envPath))
	fileContents := utils.Must(os.ReadFile(relativeFilePath))
	return string(fileContents), nil
}
