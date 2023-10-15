import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      findItem
        ? findItem.count++
        : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      findItem && findItem.count--;
      state.totalPrice -= findItem.price;
    },

    removeItem(state, action) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter((obj) => {
        return (
          obj.id !== action.payload.id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
        );
      });
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
