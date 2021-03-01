import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Browser } from "react-router-dom";

const app = (
  <Browser>
    <App />
  </Browser>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
