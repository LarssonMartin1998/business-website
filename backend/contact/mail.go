package contact

import (
	"backend/config"
	"fmt"
	"log"

	gomail "gopkg.in/mail.v2"
)

type mail = struct {
	from    string
	to      string
	subject string
	body    string
}

type mailHeader struct {
	key   string
	value string
}

func sendMail(mail mail, extraHeaders []mailHeader, auth *config.MailAuth) error {
	message := gomail.NewMessage()
	message.SetHeader("From", mail.from)
	message.SetHeader("To", mail.to)
	message.SetHeader("Subject", mail.subject)
	for _, header := range extraHeaders {
		message.SetHeader(header.key, header.value)
	}
	message.SetBody("text/plain", mail.body)

	dialer := gomail.NewDialer(auth.Host, auth.Port, auth.User, auth.Pw)
	if err := dialer.DialAndSend(message); err != nil {
		log.Printf("Failed to send mail from %s to %s\nFull error: %v", mail.from, mail.to, err)
		return err
	}

	return nil
}

func constructMailContentFromContactForm(request *sendMailRequest) (string, string) {
	var sentFrom string
	var companyBody string
	if request.Company != "" {
		sentFrom = fmt.Sprint(request.Name, ", ", request.Company)
		companyBody = fmt.Sprint("\nCompany: ", request.Company)
	} else {
		sentFrom = request.Name
		companyBody = ""
	}
	subject := fmt.Sprint("Contact Form - ", sentFrom)

	bodyPrefix := fmt.Sprintf(`
Name: %s
Email: %s`, request.Name, request.Email)

	body := fmt.Sprintf(`
%s%s

---

%s`, bodyPrefix, companyBody, request.Message)

	return subject, body
}

func (m *Module) sendMailFromRequest(request *sendMailRequest) error {
	subject, body := constructMailContentFromContactForm(request)

	mailCfg := &m.cfg.Mail
	if err := sendMail(mail{
		from:    mailCfg.FormSender,
		to:      mailCfg.Receiver,
		subject: subject,
		body:    body,
	}, []mailHeader{
		{"Reply-To", request.Email},
	}, &mailCfg.FormSenderAuth); err != nil {
		return err
	}

	return nil
}
