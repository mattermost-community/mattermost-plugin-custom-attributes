package main

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/mattermost/mattermost-server/v5/plugin"
)

type Plugin struct {
	plugin.MattermostPlugin

	// configurationLock synchronizes access to the configuration.
	configurationLock sync.RWMutex

	// configuration is the active plugin configuration. Consult getConfiguration and
	// setConfiguration for usage.
	configuration *configuration
}

func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("Mattermost-User-ID")
	if userID == "" {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	switch path := r.URL.Path; path {
	case "/api/v1/attributes":
		p.handleGetAttributes(w, r)
		return
	default:
		http.NotFound(w, r)
	}
}

func (p *Plugin) handleGetAttributes(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.NotFound(w, r)
		return
	}

	config := p.getConfiguration()
	if !config.IsValid() {
		http.Error(w, "Not configured", http.StatusNotImplemented)
		return
	}

	userID := r.URL.Query().Get("user_id")

	if userID == "" {
		http.Error(w, "Missing user_id", http.StatusBadRequest)
		return
	}

	attributes := []string{}
	for _, ca := range config.CustomAttributes {
		if ca.UserIDs == nil && ca.GroupIDs == nil {
			continue
		}
		for _, id := range ca.UserIDs {
			if id == userID {
				attributes = append(attributes, ca.Name)
			}
		}
		for _, id := range ca.GroupIDs {
			usersGroups, err := p.API.GetGroupsForUser(userID)
			if err != nil {
				http.Error(w, "Could not retrieve groups of this user", http.StatusBadRequest)
				return
			}
			for _, userGroup := range usersGroups {
				if id == userGroup.Id {
					if contains(attributes, ca.Name) {
						continue
					}
					attributes = append(attributes, ca.Name)
				}
			}

		}
	}

	b, jsonErr := json.Marshal(attributes)
	if jsonErr != nil {
		http.Error(w, "Error encoding json", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

// See https://developers.mattermost.com/extend/plugins/server/reference/
func contains(arr []string, str string) bool {
	for _, a := range arr {
		if a == str {
			return true
		}
	}
	return false
}
