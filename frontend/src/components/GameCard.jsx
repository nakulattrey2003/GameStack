import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { deleteGame } from "../services/gameService";
import { use, useEffect } from "react";

function GameCard({ game, onEdit }) {
  const dispatch = useDispatch();

  // GET wishlist from redux
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // check if game exists
  const isInWishlist = wishlistItems.some((g) => g.id === game.id);

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(game.id));
    } else {
      dispatch(addToWishlist(game));
    }
  };

  const handleDelete = async () => {
    await deleteGame(game.id);
      window.location.reload();
  };

  const handleUpdate = () => {
    onEdit(game);
  };

  const handleOpenGame = () => {
    window.open(game.freetogame_profile_url, "_blank");
  };


  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-40 object-cover"
        onClick={handleOpenGame}
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{game.title}</h2>
        <p className="text-zinc-400 mt-2">{game.genre}</p>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleWishlist}
            className={`px-3 py-1 rounded font-bold bg-green-500 text-white`}
          >
            {isInWishlist ? "Wishlist -" : "Wishlist +"}
          </button>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 px-3 py-1 rounded font-bold"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 px-3 py-1 rounded font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
