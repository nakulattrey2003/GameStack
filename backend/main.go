package main

import (
	"backend/controllers"
	"backend/data"
	"backend/services"
	"fmt"
	"net/http"
)

func enableCors(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		next.ServeHTTP(w, r)
	})
}

func main() {
	// Fetch games from the external API and store them in the in-memory data store
	games, err := services.FetchGames()

	if err != nil {
		panic(err)
	}

	data.Games = games // Store the fetched games in the in-memory data store

	fmt.Println("Games Loaded:", len(data.Games))
	mux := http.NewServeMux()

	mux.HandleFunc("/games", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {

		case "GET":
			controllers.GetGames(w, r)

		case "POST":
			controllers.CreateGame(w, r)

		case "PUT":
			controllers.UpdateGame(w, r)

		case "DELETE":
			controllers.DeleteGame(w, r)

		default:
			http.Error(
				w,
				"Method Not Allowed",
				http.StatusMethodNotAllowed,
			)
		}
	})

	fmt.Println("Server running on port 8080")

	http.ListenAndServe(":8080", enableCors(mux))
}