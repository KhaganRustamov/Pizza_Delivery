import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.categoryId = action.payload;
    },
    changeSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { changeCategory, changeSort } = filterSlice.actions;

export default filterSlice.reducer;
