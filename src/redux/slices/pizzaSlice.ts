import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IFetchPizzasArgs {
  category: number | string;
  currentPage: number;
  sortBy: string;
  order: string;
}

export const fetchPizzas = createAsyncThunk<PizzaItems[], IFetchPizzasArgs>(
  "pizza/fetchPizzas",
  async ({ category, currentPage, sortBy, order }) => {
    const res = await axios.get(
      `https://65264185917d673fd76be60b.mockapi.io/items?category=${category}&page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}`
    );
    return res.data;
  }
);

export interface PizzaItems {
  imageUrl: string;
  title: string;
  types: string[];
  sizes: number[];
  price: number;
  id: number;
}

interface PizzaInitialState {
  items: PizzaItems[];
  status: string;
}

const initialState: PizzaInitialState = {
  items: [],
  status: "",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })

      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
      })
      .addDefaultCase(() => {});
  },
});

export default pizzaSlice.reducer;
