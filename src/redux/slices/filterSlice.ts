import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  searchValue: '',
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
    changeSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    changeSort(state, action) {
      state.sort = action.payload;
    },
    changePage(state, action) {
      state.currentPage = action.payload;
    },
    // changeFilters(state, action) {
    //   state.categoryId = Number(action.payload.categoryId);
    //   state.sort = action.payload.sort;
    //   state.currentPage = Number(action.payload.currentPage);
    // },
  },
});

export const { changeCategory, changeSort, changePage, changeSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
