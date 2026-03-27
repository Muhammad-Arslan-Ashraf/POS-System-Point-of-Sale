import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedVar } = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.id === id && i.selectedVar === selectedVar,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const { id, selectedVar } = action.payload;
      const findItem = state.cartItems.find(
        (i) => i.id === id && i.selectedVar === selectedVar,
      );
      if (findItem) {
        findItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { id, selectedVar } = action.payload;
      const delItem = state.cartItems.find(
        (i) => i.id === id && i.selectedVar === selectedVar,
      );
      if (delItem && delItem.quantity > 1) {
        delItem.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      const { id, selectedVar } = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) => !(i.id === id && i.selectedVar === selectedVar),
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} = addToCartSlice.actions;
export default addToCartSlice.reducer;
