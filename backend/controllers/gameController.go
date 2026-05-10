package controllers

import (
	"encoding/json"
	"net/http"

	"backend/services"
)

func GetGames(w http.ResponseWriter, r *http.Request) {

	games, err := services.FetchGames()

	if err != nil {

		http.Error(w, "Error fetching games", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(games) // Encode the games slice to JSON and write it to the response
}