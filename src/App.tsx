import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { ReposList } from "./components/ReposList/ReposList";
import "./common.css";

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <ReposList />
    </ReduxProvider>
  );
};
