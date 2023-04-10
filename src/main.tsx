import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Schedule from "./pages/schedule/Schedule";

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
  },

  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Will cause duplication if not commented out */}
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
