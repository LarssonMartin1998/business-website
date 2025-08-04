package blog

import "time"

type blogPost struct {
	ID          int64     `json:"id"`
	Content     string    `json:"content"`
	PublishedAt time.Time `json:"published_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
