import React from "react";
import ReactDOM from "react-dom/client";
import Mainscreen from "./screen/MainScreen";

import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import "galmuri/dist/galmuri.css";
import "./reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <Mainscreen />
  </RecoilRoot>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
