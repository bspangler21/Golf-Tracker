import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { count } from "console";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddGolfer from "./pages/addGolfer/AddGolfer";
import GolferDetail from "./pages/golferDetail/GolferDetail";
import Golfers from "./pages/golfers/Golfers";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ScheduleList from "./pages/schedule/ScheduleList";
import Scorecard from "./pages/scorecard/Scorecard";
import Scorecard2 from "./pages/scorecard/Scorecard2";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <Home />,
    },
    {
      path: "/app",
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
      path: "/golfers",
      element: <Golfers />,
    },
    {
      path: "/schedule-list",
      element: <ScheduleList />,
    },
    {
      path: "/golfer-detail/:id",
      element: <GolferDetail />,
    },
    {
      path: "/add-golfer",
      element: <AddGolfer />,
    },
    {
      path: "/scorecard",
      element: <Scorecard />,
    },
    {
      path: "/scorecard2",
      element: <Scorecard2 courseName={undefined} players={undefined} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
