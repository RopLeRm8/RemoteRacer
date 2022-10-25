import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import RouteProvider from "./providers/RouteProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouteProvider />);
