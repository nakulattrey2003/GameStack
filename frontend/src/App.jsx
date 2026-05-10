import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import GameCard from "./components/GameCard";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/games");

      console.log(response.data);

      setGames(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen text-white p-10">
        <Navbar />

        <div className="grid grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
