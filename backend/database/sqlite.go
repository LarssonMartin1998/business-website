/*
Package database ...
*/
package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"

	"backend/config"
)

type SQLiteDB struct {
	db *sql.DB
}

func NewSQLiteDB(cfg *config.Config) (*SQLiteDB, error) {
	db, err := sql.Open("sqlite3", cfg.Database.Path)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	pragmas := []string{
		"PRAGMA foreign_keys=ON;",
		fmt.Sprintf("PRAGMA busy_timeout=%d;", cfg.Database.TimeoutSecs*1000),
	}

	if cfg.Database.WALMode {
		pragmas = append(pragmas,
			"PRAGMA journal_mode=WAL;",
			"PRAGMA synchronous=NORMAL;",
			"PRAGMA cache_size=1000;",   // 1MB cache
			"PRAGMA temp_store=memory;", // Use memory for temp tables
		)
	}

	for _, pragma := range pragmas {
		if _, err := db.Exec(pragma); err != nil {
			return nil, fmt.Errorf("failed to execute %s: %w", pragma, err)
		}
	}

	db.SetConnMaxLifetime(time.Duration(cfg.Database.TimeoutSecs) * time.Second)
	db.SetMaxOpenConns(cfg.Database.MaxOpenConns)
	db.SetMaxIdleConns(cfg.Database.MaxIdleConns)

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	sqlite := &SQLiteDB{db: db}
	if err := sqlite.initSchema(); err != nil {
		return nil, fmt.Errorf("failed to initialize schema: %w", err)
	}

	return sqlite, nil
}

func (s *SQLiteDB) initSchema() error {
	schema := `
	CREATE TABLE IF NOT EXISTS blog_posts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		published_at DATETIME NOT NULL,
		updated_at DATETIME NOT NULL
	);

	CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
	`

	_, err := s.db.Exec(schema)
	return err
}

func (s *SQLiteDB) Close() error {
	return s.db.Close()
}

func (s *SQLiteDB) GetDB() *sql.DB {
	return s.db
}
