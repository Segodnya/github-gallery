import { createSlice } from "@reduxjs/toolkit";
import { TStateType } from "./store";
import { IRepo } from "../types";

type TReposStateType = {
  value: IRepo[];
};

const reposSlice = createSlice({
  name: "repos",
  initialState: {
    value: [],
  } as TReposStateType,
  reducers: {
    addRepo: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addRepo } = reposSlice.actions;

export const getCurrentRepos = (state: TStateType) => state.repos.value;

export default reposSlice.reducer;
