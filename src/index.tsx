import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Provider
import { store } from "./redux/store";
import { Provider } from "react-redux";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
