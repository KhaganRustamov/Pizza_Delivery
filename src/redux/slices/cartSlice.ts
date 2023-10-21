import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IItems {
  id: number;
  title?: string;
  price?: number;
  imageUrl?: string;
  count?: number;
  type: string;
  size: number;
}

interface IInitialState {
  items: IItems[];
  totalPrice: number;
  totalCount: number;
}

const initialState: IInitialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const findCartItem = (items: IItems[], payload: IItems) => {
  return items.find(
    (item) =>
      item.id === payload.id &&
      item.size === payload.size &&
      item.type === payload.type
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IItems>) {
      const foundItem = findCartItem(state.items, action.payload);

      if (foundItem && foundItem.count) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce(
        (acc, item) =>
          item.price && item.count ? acc + item.price * item.count : 0,
        0
      );
    },

    minusItem(state, action: PayloadAction<IItems>) {
      const foundItem = findCartItem(state.items, action.payload);

      if (foundItem && foundItem.count && foundItem.count > 0) {
        foundItem.count--;
        state.totalPrice -= foundItem.price ? foundItem.price : 0;
      }
    },

    removeItem(state, action: PayloadAction<IItems>) {
      const foundItem = findCartItem(state.items, action.payload);

      if (foundItem && foundItem.count) {
        state.totalPrice -= foundItem.price
          ? foundItem.price * foundItem.count
          : 0;
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
