import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <div>Hello world!</div>,
    element: <App />,
  },
  // {
  //   path: "/details",
  //   element: <Details />,
  // },
  {
    path: "/home",
    element: <Home />,
  },
  // {
  //   path: "/enter-rates",
  //   element: <EnterRates />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Will cause duplication if not commented out */}
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
