package contact

import (
	"backend/utils"
	"net/http"
	"strings"
)

type sendMailRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Company string `json:"company"`
	Message string `json:"message"`
}

func (m *Module) handleSendMailRequest(w http.ResponseWriter, r *http.Request) {
	var req sendMailRequest
	if err := utils.DecodeJSON(w, r, &req); err != nil {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid JSON format")
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.Company = strings.TrimSpace(req.Company)
	req.Message = strings.TrimSpace(req.Message)
	if strings.ContainsAny(req.Name, "\r\n") || strings.ContainsAny(req.Company, "\r\n") {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid characters in fields")
		return
	}

	if len(req.Name) < 2 || len(req.Name) > 128 ||
		len(req.Company) > 128 || len(req.Message) == 0 || len(req.Message) > 8000 {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid field lengths")
		return
	}

	if !utils.IsStringValidEmail(req.Email) {
		utils.RespondWithJSON(w, http.StatusBadRequest, false, nil, "Invalid Email in Request")
		return
	}

	if err := m.sendMailFromRequest(&req); err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, "Error sending mail from client via form.")
		return
	}

	mailCfg := &m.cfg.Mail
	if err := sendMail(mail{
		from:    mailCfg.NotificationSender,
		to:      req.Email,
		subject: mailCfg.NotificationSubject,
		body:    mailCfg.NotificationBody,
	},
		nil,
		&m.cfg.Mail.NotificationSenderAuth); err != nil {
		utils.RespondWithJSON(w, http.StatusInternalServerError, false, nil, "Error sending notification mail to client.")
		return
	}

	utils.RespondWithJSON(w, http.StatusCreated, true, nil, "")
}
