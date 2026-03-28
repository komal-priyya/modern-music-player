import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./app/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#132238",
          color: "#f8fafc",
          border: "1px solid rgba(148, 163, 184, 0.2)",
        },
      }}
    />
  </React.StrictMode>
);
