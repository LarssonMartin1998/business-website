package blog

import (
	"backend/utils"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type createPostRequest struct {
	Content string `json:"content"`
}

type updatePostRequest struct {
	Content string `json:"content"`
}

func (m *Module) createPost(w http.ResponseWriter, r *http.Request) {
	var req createPostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid JSON format")
		return
	}

	if req.Content == "" {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Content is required")
		return
	}

	post, err := m.store.create(&req)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, post, fmt.Sprintf("Error creating Blog Post: %v", err))
		return
	}

	utils.RespondWithJSON(w, http.StatusCreated, true, post, "")
}

func (m *Module) getPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := m.store.getAll()
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, posts, fmt.Sprintf("Error reading Blog Posts: %v", err))
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
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, fmt.Sprintf("Error reading Blog Post: %v", err))
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

	post, err := m.store.update(id, &req)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, fmt.Sprintf("Error updating Blog Post: %v", err))
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
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, fmt.Sprintf("Error deleting Blog Post: %v", err))
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, nil, "")
}
