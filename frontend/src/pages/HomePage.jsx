import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import AddGameModal from "../components/AddGameModal";
import UpdateGameModal from "../components/UpdateGameModal";
import { getGames } from "../services/gameService";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // pagination logic
  const gamesPerPage = 8;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames();
    setCurrentPage(1);
  }, []);

  const fetchGames = async () => {
    const res = await getGames();
    setGames(res.data);
  };

  const handleWishlist = () => {
    navigate("/wishlist");
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <Navbar />

      <button
        onClick={() => setIsAddOpen(true)}
        className="bg-green-500 px-4 py-2 mb-4"
      >
        Add Game
      </button>

      <button
        onClick={() => handleWishlist()}
        className="bg-purple-500 ml-2 px-4 py-2 mb-4"
      >
        Wishlist
      </button>

      <div className="grid grid-cols-4 gap-6">
        {currentGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={(game) => {
              setSelectedGame(game);
              setIsEditOpen(true);
            }}
            refreshGames={fetchGames}
          />
        ))}
      </div>

      {isAddOpen && (
        <AddGameModal
          onClose={() => setIsAddOpen(false)}
          onGameAdded={fetchGames}
        />
      )}

      {isEditOpen && (
        <UpdateGameModal
          game={selectedGame}
          onClose={() => setIsEditOpen(false)}
          onGameUpdated={fetchGames}
        />
      )}

      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Prev
        </button>

        <span className="px-3 py-1"> {currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev + 1 <= Math.ceil(games.length / gamesPerPage)
                ? prev + 1
                : prev,
            )
          }
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;
