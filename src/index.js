import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./Store";

import { view as UserApps } from "./pages/home";

import "./styles.css";
import "antd/dist/antd.css";

export function App() {
  // fetch("https://zeit-serverless-node.now.sh/api/hello");
  return (
    <Provider store={Store}>
      My Computer
      <UserApps />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
