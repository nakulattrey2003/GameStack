package services

import (
	"encoding/json"
	"io"
	"net/http"

	"backend/models"
)

func FetchGames() ([]models.Game, error) {

	url := "https://www.freetogame.com/api/games"

	response, err := http.Get(url)

	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	var games []models.Game

	data, err := io.ReadAll(response.Body)

	if err != nil {
		return nil, err
	}

	json.Unmarshal(data, &games)

	return games, nil
}