import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISort {
  name: string;
  sortProperty: string;
}

interface FilterInitialState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: ISort;
}

const initialState: FilterInitialState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sort: {
    name: "Best rating",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    changeSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    changeSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    changePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { changeCategory, changeSort, changePage, changeSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
