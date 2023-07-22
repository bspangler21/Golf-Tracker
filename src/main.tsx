import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Schedule from "./pages/golfers/Golfers";
import Golfers from "./pages/golfers/Golfers";
import GolfersAlt from "./pages/golfers/GolfersAlt";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Home />,
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
    path: "/golfers",
    element: <Golfers />,
  },
  {
    path: "/golfers-alt",
    element: <GolfersAlt />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Will cause duplication if not commented out */}
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
