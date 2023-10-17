import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async ({ category, currentPage, sortBy, order }) => {
    const res = await axios.get(
      `https://65264185917d673fd76be60b.mockapi.io/items?category=${category}&page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}`
    );
    return res;
  }
);

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      // state.items = action.payload;
      console.log("a");
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      // state.items = action.payload;
      console.log("b");
    },
    [fetchPizzas.rejected]: (state, action) => {
      // state.items = action.payload;
      console.log("c");
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
