/*
Package blog ...
*/
package blog

import (
	"sync"
	"time"
)

type blogStore struct {
	posts  map[int]*blogPost
	nextID int
	mutex  sync.RWMutex
}

func NewBlogStore() blogStore {
	return blogStore{
		posts:  make(map[int]*blogPost),
		nextID: 1,
	}
}

func (bs *blogStore) create(req *createPostRequest) *blogPost {
	bs.mutex.Lock()
	defer bs.mutex.Unlock()

	post := &blogPost{
		ID:          bs.nextID,
		Title:       req.Title,
		Content:     req.Content,
		PublishedAt: time.Now(),
		UpdatedAt:   time.Now(),
	}

	bs.posts[post.ID] = post
	bs.nextID++

	return post
}

func (bs *blogStore) getAll() []*blogPost {
	bs.mutex.RLock()
	defer bs.mutex.RUnlock()

	posts := make([]*blogPost, 0, len(bs.posts))
	for _, post := range bs.posts {
		posts = append(posts, post)
	}
	return posts
}

func (bs *blogStore) getByID(id int) *blogPost {
	bs.mutex.RLock()
	defer bs.mutex.RUnlock()

	return bs.posts[id]
}

func (bs *blogStore) update(id int, req *updatePostRequest) *blogPost {
	bs.mutex.Lock()
	defer bs.mutex.Unlock()

	if post, exists := bs.posts[id]; exists {
		post.Title = req.Title
		post.Content = req.Content
		post.UpdatedAt = time.Now()
		return post
	}
	return nil
}

func (bs *blogStore) delete(id int) bool {
	bs.mutex.Lock()
	defer bs.mutex.Unlock()

	if _, exists := bs.posts[id]; exists {
		delete(bs.posts, id)
		return true
	}
	return false
}
