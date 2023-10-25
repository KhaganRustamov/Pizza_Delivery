import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPopup = createAsyncThunk("popup/fetchPopup", async () => {
  const { data } = await axios.post(
    "https://65264185917d673fd76be60b.mockapi.io/popup"
  );
  return data;
});

interface PopupInitialState {
  isPopupOpen: boolean;
  cardNumber: string;
  expiryDate: string;
  status: string;
}

const initialState: PopupInitialState = {
  isPopupOpen: false,
  cardNumber: "",
  expiryDate: "",
  status: "loading",
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup(state) {
      state.isPopupOpen = true;
    },

    closePopup(state) {
      state.isPopupOpen = false;
    },

    handleCardNumberChange(state, action: PayloadAction<string>) {
      state.cardNumber = action.payload;
    },

    handleExpiryDateChange(state, action: PayloadAction<string>) {
      state.expiryDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopup.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(fetchPopup.rejected, (state) => {
        state.status = "error";
      })
      .addDefaultCase(() => {});
  },
});

export const {
  openPopup,
  closePopup,
  handleCardNumberChange,
  handleExpiryDateChange,
} = popupSlice.actions;

export default popupSlice.reducer;
