import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { HashRouter, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import MRoute from "./route/routes";
import history from "./views/history";

window.onselectstart = function () {
  return false;
};

const Router =
  process.env.NODE_ENV === "production" ? BrowserRouter : HashRouter;
ReactDOM.render(
  // Provider是react-redux的一个组件，规定只能用store属性传输state仓库
  <Provider store={store}>
    {/* <Router>
      <App />
    </Router> */}
    <Router>
      <MRoute></MRoute>
    </Router>
  </Provider>,
  document.querySelector("#app")
);

serviceWorker.unregister();
