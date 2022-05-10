import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DAppProvider } from "@usedapp/core";
import { NearContextProvider } from "hooks/nearContext";
import "./index.scss";
import App from "./App";
import store from "state";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <NearContextProvider>
      <DAppProvider config={{}}>
        <App />
      </DAppProvider>
    </NearContextProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
