/*
Package blog ...
*/
package blog

import (
	"database/sql"
	"errors"
	"log"
	"strings"
	"time"
)

type blogStore struct {
	db *sql.DB
}

type Scanner interface {
	Scan(dest ...any) error
}

func newBlogStore(db *sql.DB) blogStore {
	return blogStore{
		db: db,
	}
}

func (bs *blogStore) create(req *createPostRequest) (*blogPost, error) {
	query := `INSERT INTO blog_posts (content, tags, published_at, updated_at)
    VALUES (?, ?, ?, ?)`
	createError := errors.New("failed to create Blog Post")

	now := time.Now()
	result, err := bs.db.Exec(query, req.Content, strings.ToLower(req.Tags), now, now)
	if err != nil {
		log.Printf("Failed to create Blog Post with query: '%s'\nFull error: %v", query, err)
		return nil, createError
	}

	ID, err := result.LastInsertId()
	if err != nil {
		log.Printf("Failed to read LastInsertId: %v", err)
		return nil, createError
	}

	return bs.getByID(ID)
}

func (bs *blogStore) getAll() ([]*blogPost, error) {
	query := `SELECT id, content, tags, published_at, updated_at 
                FROM blog_posts 
                ORDER BY published_at DESC`
	getAllErr := errors.New("failed to get all Blog Posts")

	rows, err := bs.db.Query(query)
	if err != nil {
		log.Printf("Failed to getAll with query: %s\nFull error: %v", query, err)
		return nil, getAllErr
	}
	defer rows.Close()

	posts := make([]*blogPost, 0, 100)
	for rows.Next() {
		post, err := scanBlogPost(rows)
		if err != nil {
			return nil, getAllErr
		}

		posts = append(posts, post)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Failed to iterate rows in getAll: %v", err)
		return nil, getAllErr
	}

	return posts, nil
}

func (bs *blogStore) getByID(id int64) (*blogPost, error) {
	query := `SELECT id, content, tags, published_at, updated_at FROM blog_posts WHERE id = ?`
	row := bs.db.QueryRow(query, id)
	post, err := scanBlogPost(row)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return post, nil
}

func (bs *blogStore) update(id int64, req *updatePostRequest) (*blogPost, error) {
	query := `UPDATE blog_posts SET content = ?, tags = ?, updated_at = ? WHERE id = ?`
	updateError := errors.New("failed to update Blog Post")

	result, err := bs.db.Exec(query, req.Content, strings.ToLower(req.Tags), time.Now(), id)
	if err != nil {
		log.Printf("Failed to update Blog Post with: '%s'\nFull error: %v", query, err)
		return nil, updateError
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Printf("Failed to read RowsAffected in update: %v", err)
		return nil, updateError
	}
	if rowsAffected != 1 {
		log.Printf("rowsAffected should equal 1 after running update, not %v", rowsAffected)
		return nil, sql.ErrNoRows
	}

	return bs.getByID(id)
}

func (bs *blogStore) delete(id int64) error {
	query := `DELETE FROM blog_posts WHERE id = ?`
	result, err := bs.db.Exec(query, id)

	deleteError := errors.New("failed to delete Blog Post")
	if err != nil {
		log.Printf("Failed to delete Blog Post with query: %s\nFull error: %v", query, err)
		return deleteError
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Printf("Failed to read RowsAffected in delete: %v", err)
		return deleteError
	}
	if rowsAffected != 1 {
		log.Printf("rowsAffected should equal 1 after running delete, not %v", rowsAffected)
		return sql.ErrNoRows
	}

	return nil
}

func scanBlogPost(scanner Scanner) (*blogPost, error) {
	post := blogPost{}
	err := scanner.Scan(&post.ID, &post.Content, &post.Tags, &post.PublishedAt, &post.UpdatedAt)
	if err != nil {
		log.Printf("Failed to scan Blog Post: %v", err)
		return nil, errors.New("failed to scan Blog Post")
	}

	return &post, nil
}
