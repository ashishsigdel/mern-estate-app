import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sighInStart: (state) => {
      state.loading = true;
    },
    sighInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    sighInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { sighInStart, sighInSuccess, sighInFailure } =
  counterSlice.actions;

export default counterSlice.reducer;
