import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";

function WishlistPage() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="bg-purple-500 px-4 py-2 rounded font-bold"
        >
          ← Back
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4">
        {items.length === 0 ? (
          <p className="text-gray-400">No games in wishlist</p>
        ) : (
          items.map((game) => (
            <div key={game.id} className="bg-zinc-800 p-4 rounded">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="mt-2 font-semibold">{game.title}</h2>

              <button
                onClick={() => dispatch(removeFromWishlist(game.id))}
                className="bg-red-500 px-3 py-1 mt-3 rounded"
              >
                Remove from Wishlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
