import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CATEGORIES } from "../constants/constant";

const storeCategories = localStorage.getItem("categories");

const initialState = {
  categories: storeCategories
    ? JSON.parse(storeCategories)
    : DEFAULT_CATEGORIES,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now(),
        timestamp: Date.now(),
        ...action.payload,
        items: [],
        totalOrderDetails: [],
      });
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    editCategory: (state, action) => {
      const index = state.categories.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload,
      );
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    addItem: (state, action) => {
      const { category, item } = action.payload;
      const cat = state.categories.find((cat) => cat.name === category);
      if (cat) {
        cat.items.push(item);
      }
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    editItem: (state, action) => {
      const { category, itemId, updateItem } = action.payload;
      const cat = state.categories.find((cat) => cat.name === category);
      if (cat) {
        const index = cat.items.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          cat.items[index] = { ...cat.items[index], ...updateItem, id: itemId };
        }
      }
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    deleteCard: (state, action) => {
      for (const cat of state.categories) {
        const index = cat.items.findIndex((item) => item.id === action.payload);
        if (index !== -1) {
          cat.items.splice(index, 1);
          break;
        }
      }
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
  },
});

export const {
  addCategory,
  editCategory,
  deleteCategory,
  addItem,
  editItem,
  deleteCard,
} = categorySlice.actions;
export default categorySlice.reducer;
