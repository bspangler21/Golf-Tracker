import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Golfers from "./pages/golfers/Golfers";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Header from "./pageComponents/Header";
import GolferDetail from "./pages/golferDetail/GolferDetail";
import ScheduleList from "./pages/schedule/ScheduleList";
import MatchListing from "./pages/matches/MatchListing";
import Scorecard from "./pages/scorecard/Scorecard";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AddGolfer from "./pages/golfers/AddGolfer";
import Footer from "./pageComponents/Footer";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" Component={Home}></Route>

				<Route path="/golfers" Component={Golfers}></Route>
				<Route path="/login" Component={Login}></Route>
				<Route
					path="/golfer-detail/:id"
					Component={GolferDetail}
				></Route>
				<Route path="/schedule-list" Component={ScheduleList}></Route>
				<Route path="/matches/:id" Component={MatchListing}></Route>
				<Route
					path="/scorecard/:golfer1Id/:golfer2Id/:dateId"
					Component={Scorecard}
				></Route>
				<Route path="/add-golfer" Component={AddGolfer}></Route>
			</Routes>
			<SpeedInsights />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
