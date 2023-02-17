import React from "react";
import ReactDOM from "react-dom/client";
import "./css/Global.css";
import RouteProvider from "./providers/RouteProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouteProvider />);
