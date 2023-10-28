import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPopup = createAsyncThunk("popup/fetchPopup", async () => {
  const { data } = await axios.post(
    "https://65264185917d673fd76be60b.mockapi.io/popup"
  );
  return data;
});

enum PopupStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PopupInitialState {
  isPopupOpen: boolean;
  cardNumber: string;
  expiryDate: string;
  phoneNumber: string;
  status: PopupStatus;
}

const initialState: PopupInitialState = {
  isPopupOpen: false,
  cardNumber: "",
  expiryDate: "",
  phoneNumber: "",
  status: PopupStatus.LOADING,
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

    handleFieldChange(
      state,
      action: PayloadAction<{ field: "cardNumber" | "expiryDate" | "phoneNumber"; value: string }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopup.pending, (state) => {
        state.status = PopupStatus.LOADING;
      })
      .addCase(fetchPopup.fulfilled, (state) => {
        state.status = PopupStatus.SUCCESS;
      })
      .addCase(fetchPopup.rejected, (state) => {
        state.status = PopupStatus.ERROR;
      })
      .addDefaultCase(() => {});
  },
});

export const {
  openPopup,
  closePopup,
  handleFieldChange,
} = popupSlice.actions;

export default popupSlice.reducer;
