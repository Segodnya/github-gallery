import { configureStore } from "@reduxjs/toolkit";
import reposSlice from "./reposSlice";
import selectedRepoSlice from "./selectedRepoSlice";

export const store = configureStore({
  reducer: {
    repos: reposSlice,
    selectedRepo: selectedRepoSlice,
  },
});

export type TStateType = ReturnType<typeof store.getState>;
