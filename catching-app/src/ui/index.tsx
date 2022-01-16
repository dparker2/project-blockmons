import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./ui.scss";

window.addEventListener("load", () => {
  ReactDOM.render(<App />, document.getElementById("ui-root"));
});
