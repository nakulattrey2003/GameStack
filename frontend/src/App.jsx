import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}

export default App;
