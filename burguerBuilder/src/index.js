import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Browser } from "react-router-dom";
import { burguerBuilder } from "./store/reducers/burguerBuilder";
import { reducerOrder } from "./store/reducers/order";
import { reducerAuth } from "./store/reducers/auth";

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burguerBuilder: burguerBuilder,
  order: reducerOrder,
  auth: reducerAuth,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Browser>
      <App />
    </Browser>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
