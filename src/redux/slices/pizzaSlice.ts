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
    const { data } = await axios.get<PizzaItems[]>(
      `https://65264185917d673fd76be60b.mockapi.io/items?category=${category}&page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}`
    );
    return data;
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

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaInitialState {
  items: PizzaItems[];
  status: Status;
}

const initialState: PizzaInitialState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
      })
      .addDefaultCase(() => {});
  },
});

export default pizzaSlice.reducer;
