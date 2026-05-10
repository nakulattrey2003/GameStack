import { useSelector } from "react-redux";

function Navbar() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold mb-10">
          G A M E <span className="text-green-400">S T A C K</span>
        </h1>
        <div className="text-xl font-bold">
          Wishlist: {wishlistItems.length}
        </div>
      </div>
    </>
  );
}

export default Navbar;
