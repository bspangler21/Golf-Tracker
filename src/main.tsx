import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import {
// 	FluentProvider,
// 	webLightTheme,
// 	Button,
// } from "@fluentui/react-components";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
// import Schedule from "./pages/golfers/Golfers";
// import Golfers from "./pages/golfers/Golfers";
import Golfers from "./pages/golfers/Golfers";
import ScheduleList from "./pages/schedule/ScheduleList";
import GolferDetail from "./pages/golferDetail/GolferDetail";
import AddGolfer from "./pages/addGolfer/AddGolfer";
import Scorecard from "./pages/scorecard/Scorecard";
import Header from "./pageComponents/Header";
import Scorecard2 from "./pages/scorecard/Scorecard2";

// const router = createBrowserRouter([
//   {
//     path: "/",

//     element: <Home />,
//   },
//   {
//     path: "/app",
//     element: <App />,
//   },

//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "https://golf-tracker-gray.vercel.app/golfers",
//     element: <Golfers />,
//   },
//   {
//     path: "/schedule-list",
//     element: <ScheduleList />,
//   },
//   {
//     path: "/golfer-detail/:id",
//     element: <GolferDetail />,
//   },
//   {
//     path: "/add-golfer",
//     element: <AddGolfer />,
//   },
//   {
//     path: "/scorecard",
//     element: <Scorecard />,
//   },
//   {
//     path: "/scorecard2",
//     element: <Scorecard2 courseName={undefined} players={undefined} />,
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     children: [
//       {
//         path: "/app",
//         element: <App />,
//       },

//       {
//         path: "/home",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/golfers",
//         element: <Golfers />,
//       },
//       {
//         path: "/schedule-list",
//         element: <ScheduleList />,
//       },
//       {
//         path: "/golfer-detail/:id",
//         element: <GolferDetail />,
//       },
//       {
//         path: "/add-golfer",
//         element: <AddGolfer />,
//       },
//       {
//         path: "/scorecard",
//         element: <Scorecard />,
//       },
//       {
//         path: "/scorecard2",
//         element: <Scorecard2 courseName={undefined} players={undefined} />,
//       },
//     ],
//   },
// ]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Header />
    {/* Will cause duplication if not commented out */}
    <App />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);
