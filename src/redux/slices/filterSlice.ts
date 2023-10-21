import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: IInitialState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

type Action = PayloadAction<IInitialState>;

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeCategory(state, action: Action) {
      state.categoryId = action.payload.categoryId;
    },
    changeSearchValue(state, action: Action) {
      state.searchValue = action.payload.searchValue;
    },
    changeSort(state, action: Action) {
      state.sort = action.payload.sort;
    },
    changePage(state, action: Action) {
      state.currentPage = action.payload.currentPage;
    },
    // changeFilters(state, action) {
    //   state.categoryId = Number(action.payload.categoryId);
    //   state.sort = action.payload.sort;
    //   state.currentPage = Number(action.payload.currentPage);
    // },
  },
});

export const { changeCategory, changeSort, changePage, changeSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
