import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = localStorage.getItem("wishlist");
const initialState = {
  items: savedWishlist ? JSON.parse(savedWishlist) : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const gameExists = state.items.find(
        (game) => game.id === action.payload.id,
      );

      if (!gameExists) {
        state.items.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((game) => game.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
