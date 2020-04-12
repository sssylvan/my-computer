import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./Store";
import Toggle from "./Toggle";

import "./styles.css";

export function App() {
  return (
    <Provider store={Store}>
      <Toggle />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
