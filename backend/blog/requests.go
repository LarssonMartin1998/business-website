package blog

import (
	"backend/utils"
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"
)

type createPostRequest struct {
	Content string `json:"content"`
	Tags    string `json:"tags"`
}

type updatePostRequest struct {
	Content string `json:"content"`
	Tags    string `json:"tags"`
}

func contentHasValidMarkdownHeader(content string) bool {
	lines := strings.Split(content, "\n")
	if len(lines) <= 0 {
		return false
	}

	firstLine := strings.TrimSpace(lines[0])
	expression := regexp.MustCompile(`^#\s+\S+`)

	return expression.MatchString(firstLine)
}

func tagsAreValid(tags string) bool {
	expression := regexp.MustCompile(`^[a-zA-Z,]+$`)
	return expression.MatchString(tags)
}

func validatePost(content string, tags string) error {
	trimmed := strings.TrimSpace(content)
	if trimmed == "" {
		return errors.New("empty ")
	}

	const unreasonablySmallLen = 50
	if len(trimmed) < unreasonablySmallLen {
		return errors.New("too short content submitted in blog post")
	}

	const unreasonableBlogLen = 7500
	if len(content) > unreasonableBlogLen {
		return errors.New("too long content submitted in blog post")
	}

	if !contentHasValidMarkdownHeader(content) {
		return errors.New("first line is not a valid markdown header")
	}

	if !tagsAreValid(tags) {
		return errors.New("")
	}

	return nil
}

func (m *Module) createPost(w http.ResponseWriter, r *http.Request) {
	var req createPostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid JSON format")
		return
	}

	if validatePost(req.Content, req.Tags) != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post content")
		return
	}

	post, err := m.store.create(&req)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, post, "Error creating Blog Post")
		return
	}

	utils.RespondWithJSON(w, http.StatusCreated, true, post, "")
}

func (m *Module) getPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := m.store.getAll()
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, posts, "Error reading Blog Posts")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, posts, "")
}

func (m *Module) getPost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post ID")
		return
	}

	post, err := m.store.getByID(id)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, "Error reading Blog Post")
		return
	}
	if post == nil {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, post, "")
}

func (m *Module) updatePost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post ID")
		return
	}

	var req updatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid JSON format")
		return
	}

	if validatePost(req.Content, req.Tags) != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post content")
		return
	}

	post, err := m.store.update(id, &req)
	if err == sql.ErrNoRows {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, "Error updating Blog Post")
		return
	}
	if post == nil {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, post, "")
}

func (m *Module) deletePost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post ID")
		return
	}

	err = m.store.delete(id)
	if err == sql.ErrNoRows {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}

	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, "Error deleting Blog Post")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, nil, "")
}
