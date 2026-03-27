import { configureStore } from "@reduxjs/toolkit";
import CategoryReducers from "./categorySlice";
import addToCartReducers from "./addToCart";
import navinHeader from "./showNav";
export const store = configureStore({
  reducer: {
    categories: CategoryReducers,
    addToCart: addToCartReducers,
    shared: navinHeader,
  },
});
