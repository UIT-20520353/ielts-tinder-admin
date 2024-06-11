import type { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isLoading: number;
}

const initialState: GlobalState = {
  isLoading: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addLoading: (state) => {
      state.isLoading += 1;
    },
    removeLoading: (state) => {
      state.isLoading -= 1;
    },
  },
});

export const { addLoading, removeLoading } = globalSlice.actions;

export const selectIsLoading = (state: RootState) => state.global.isLoading;

export default globalSlice.reducer;
