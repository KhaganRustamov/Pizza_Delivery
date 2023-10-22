import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItems {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  type: string;
  size: number;
}

interface CartInitialState {
  items: CartItems[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartInitialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const findCartItem = (items: CartItems[], payload: CartItems) => {
  return items.find(
    (item) =>
      item.id === payload.id &&
      item.size === payload.size &&
      item.type === payload.type
  );
};

type Action = PayloadAction<CartItems>;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: Action) {
      const foundItem = findCartItem(state.items, action.payload);

      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
    },

    minusItem(state, action: Action) {
      const foundItem = findCartItem(state.items, action.payload);

      if (foundItem && foundItem.count > 0) {
        foundItem.count--;
        state.totalPrice -= foundItem.price;
      }
    },

    removeItem(state, action: Action) {
      const foundItem = findCartItem(state.items, action.payload);

      if (foundItem) {
        state.totalPrice -= foundItem.price * foundItem.count;
        state.items = state.items.filter(
          (item) =>
            item.id !== action.payload.id ||
            item.size !== action.payload.size ||
            item.type !== action.payload.type
        );
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
