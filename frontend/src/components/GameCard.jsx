import { useDispatch } from "react-redux";

import { addToWishlist } from "../redux/wishlistSlice";

function GameCard({ game }) {
  const dispatch = useDispatch();

  const handleWishlist = () => {
    dispatch(addToWishlist(game));
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">
      <img src={game.thumbnail} alt={game.title} className="w-full" />

      <div className="p-4">
        <h2 className="text-xl font-bold">{game.title}</h2>

        <p className="text-zinc-400 mt-2">{game.genre}</p>

        <button
          onClick={handleWishlist}
          className="mt-4 bg-green-500 text-black px-4 py-2 rounded font-bold"
        >
          Add To Wishlist
        </button>
      </div>
    </div>
  );
}

export default GameCard;
