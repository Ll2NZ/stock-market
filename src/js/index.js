import "../css/style.scss";
import React        from "react";
import { render }   from "react-dom";
import App          from "./App";

render(
    <App/>,
    window.document.querySelector(".app")
);
