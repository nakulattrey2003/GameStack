package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"backend/data"
	"backend/models"
)

func GetGames(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	limit := 100
	if len(data.Games) < 100 {
		limit = len(data.Games)
	}
	json.NewEncoder(w).Encode(data.Games[0:limit]) // Encode the games slice to JSON and write it to the response
}

func CreateGame(w http.ResponseWriter, r *http.Request) {
	var newGame models.Game
	err := json.NewDecoder(r.Body).Decode(&newGame)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}
	fmt.Println("newGame: ", newGame)
	data.Games = append([]models.Game{newGame}, data.Games...) // Add the new game to the beginning of the games slice
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newGame)

}

func UpdateGame(w http.ResponseWriter, r *http.Request) {

	idParam := r.URL.Query().Get("id")

	id, err := strconv.Atoi(idParam)

	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	var updatedGame models.Game

	err = json.NewDecoder(r.Body).Decode(&updatedGame)

	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	for i, game := range data.Games {

		if game.ID == id {

			// keep same ID
			updatedGame.ID = id

			// replace
			existing := &data.Games[i]

			if updatedGame.Title != "" {
				existing.Title = updatedGame.Title
			}

			if updatedGame.Genre != "" {
				existing.Genre = updatedGame.Genre
			}

			if updatedGame.Platform != "" {
				existing.Platform = updatedGame.Platform
			}

			if updatedGame.ShortDescription != "" {
				existing.ShortDescription = updatedGame.ShortDescription
			}

			json.NewEncoder(w).Encode(existing)

			w.Header().Set("Content-Type", "application/json")
			return
		}
	}

	http.Error(w, "Game not found", http.StatusNotFound)
}

func DeleteGame(w http.ResponseWriter, r *http.Request) {
	idParam := r.URL.Query().Get("id")

	id, err := strconv.Atoi(idParam)

	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	for i, game := range data.Games {
		if game.ID == id {
			data.Games = append(data.Games[:i], data.Games[i+1:]...) // this removes the game from the slice
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(game)
			return
		}
	}

	http.Error(w, "Game not found", http.StatusNotFound)
}
