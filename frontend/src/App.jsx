import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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
        <h1 className="text-4xl font-bold mb-10">
          G A M E <span className="text-green-400">S T A C K</span>
        </h1>

        <div className="grid grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-zinc-900 rounded-xl overflow-hidden"
            >
              <img src={game.thumbnail} alt={game.title} className="w-full" />

              <div className="p-4">
                <h2 className="text-xl font-bold">{game.title}</h2>

                <p className="text-zinc-400 mt-2">{game.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
