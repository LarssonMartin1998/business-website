package blog

import (
	"backend/utils"
	"encoding/json"
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

	post := m.store.create(&req)
	utils.RespondWithJSON(w, http.StatusCreated, true, post, "")
}

func (m *Module) getPosts(w http.ResponseWriter, r *http.Request) {
	posts := m.store.getAll()
	utils.RespondWithJSON(w, http.StatusOK, true, posts, "")
}

func (m *Module) getPost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post ID")
		return
	}

	post := m.store.getByID(id)
	if post == nil {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, post, "")
}

func (m *Module) updatePost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post ID")
		return
	}

	var req updatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid JSON format")
		return
	}

	post := m.store.update(id, &req)
	if post == nil {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, post, "")
}

func (m *Module) deletePost(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid post ID")
		return
	}

	if !m.store.delete(id) {
		utils.RespondWithJSON(w, http.StatusNotFound, false, nil, "Post not found")
		return
	}

	utils.RespondWithJSON(w, http.StatusOK, true, nil, "")
}
