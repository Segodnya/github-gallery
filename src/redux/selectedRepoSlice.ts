import { createSlice } from "@reduxjs/toolkit";
import { TStateType } from "./store";

export const TOTAL_NUMBER_OF_ARRAYS = 30;

type TCurrentSelectedRepo = {
  value: number;
};

const selectedRepoSlice = createSlice({
  name: "selectedRepo",
  initialState: {
    value: 0,
  } as TCurrentSelectedRepo,
  reducers: {
    increment: (state) => {
      state.value === TOTAL_NUMBER_OF_ARRAYS - 1
        ? (state.value = 0)
        : state.value++;
    },
    decrement: (state) => {
      state.value === 0
        ? (state.value = TOTAL_NUMBER_OF_ARRAYS - 1)
        : state.value--;
    },
  },
});

export const { increment, decrement } = selectedRepoSlice.actions;

export const getCurrentElement = (state: TStateType) =>
  state.selectedRepo.value;

export default selectedRepoSlice.reducer;
