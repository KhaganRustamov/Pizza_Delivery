import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
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
    changePage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCategory, changeSort, changePage } = filterSlice.actions;

export default filterSlice.reducer;
