package main

import (
	"backend/controllers"
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
	mux := http.NewServeMux()

	mux.HandleFunc("/games", controllers.GetGames)

	fmt.Println("Server running on port 8080")

	http.ListenAndServe(":8080", enableCors(mux))
}