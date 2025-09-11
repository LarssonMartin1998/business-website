package blog

import (
	"encoding/xml"
	"errors"
	"fmt"
	"html"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/russross/blackfriday/v2"
)

type RSS struct {
	XMLName xml.Name `xml:"rss"`
	Version string   `xml:"version,attr"`
	Channel Channel  `xml:"channel"`
}

type Channel struct {
	Title         string `xml:"title"`
	Link          string `xml:"link"`
	Description   string `xml:"description"`
	Language      string `xml:"language"`
	PubDate       string `xml:"pubDate"`
	LastBuildDate string `xml:"lastBuildDate"`
	Items         []Item `xml:"item"`
}

type Item struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	Description string `xml:"description"`
	PubDate     string `xml:"pubDate"`
	GUID        string `xml:"guid"`
}

func extractTitleFromMarkdown(content string) string {
	lines := strings.Split(content, "\n")
	if len(lines) > 0 {
		firstLine := strings.TrimSpace(lines[0])
		if strings.HasPrefix(firstLine, "# ") {
			return strings.TrimSpace(firstLine[2:])
		}
	}
	return "Untitled Post"
}

func getBaseURL(r *http.Request) string {
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	return fmt.Sprintf("%s://%s", scheme, r.Host)
}

func constructXMLFeed(posts []*blogPost, r *http.Request) ([]byte, error) {
	// TODO: Implement a cache of the generated RSS feed.
	// We don't need to re-generate it unless the blog store changes.

	baseURL := getBaseURL(r)

	rss := RSS{
		Version: "2.0",
		Channel: Channel{
			Title:       "Martin Larsson",
			Link:        baseURL,
			Description: "Thoughts about Computers, Programming, and Life.",
			Language:    "en-us",
			Items:       make([]Item, len(posts)),
		},
	}

	if len(posts) > 0 {
		rss.Channel.PubDate = posts[0].PublishedAt.Format(time.RFC1123Z)
		rss.Channel.LastBuildDate = time.Now().Format(time.RFC1123Z)
	}

	for i, post := range posts {
		title := extractTitleFromMarkdown(post.Content)
		htmlContent := string(blackfriday.Run([]byte(post.Content)))

		rss.Channel.Items[i] = Item{
			Title:       html.EscapeString(title),
			Link:        fmt.Sprintf("%s/posts/%d", baseURL, post.ID),
			Description: htmlContent,
			PubDate:     post.PublishedAt.Format(time.RFC1123Z),
			GUID:        fmt.Sprintf("%s/posts/%d", baseURL, post.ID),
		}
	}

	xml, err := xml.MarshalIndent(rss, "", "  ")
	if err != nil {
		log.Printf("Failed to ")
		return nil, errors.New("failed to MarshalIndent rss")
	}

	return xml, nil
}
