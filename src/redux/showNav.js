import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navData: "" || "POS",
};

const showNavSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    addNavInHeader: (state, action) => {
      state.navData = action.payload;
    },
  },
});
export const { addNavInHeader } = showNavSlice.actions;
export default showNavSlice.reducer;
