import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Golfers from "./pages/golfers/Golfers";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Header from "./pageComponents/Header";
import GolferDetail from "./pages/golferDetail/GolferDetail";
import ScheduleList from "./pages/schedule/ScheduleList";
import MatchListing from "./pages/matches/MatchListing";
import EditScorecard from "./pages/scorecard/EditScorecard";
// import Scorecard from "./pages/scorecard/Scorecard";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Footer from "./pageComponents/Footer";
import AddGolfer from "./pages/golfers/AddGolfer";
import EditGolfer from "./pages/golfers/EditGolfer";
// import Scorecard2 from "./pages/scorecard/Scorecard2";
import AddDate from "./pages/schedule/AddDate";
import EditDate from "./pages/schedule/EditDate";
import AddScorecard from "./pages/scorecard/AddScorecard";

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
				<Route
					path="/schedule-list/edit/:id"
					Component={EditDate}
				></Route>
				<Route path="/add-date" Component={AddDate}></Route>
				<Route path="/matches/:weekNumber" Component={MatchListing}></Route>
				{/* <Route
					path="/scorecard/:golfer1Id/:golfer2Id/:matchId/:dateId"
					Component={Scorecard}
				></Route> */}
				<Route
					path="/scorecard/add/:golfer1Id/:golfer2Id/:matchId"
					Component={AddScorecard}
				></Route>
				<Route
					path="/scorecard/edit/:golfer1Id/:golfer2Id/:matchId"
					Component={EditScorecard}
				></Route>
				{/* <Route path="/scorecard2" Component={Scorecard2}></Route> */}
				<Route path="/add-golfer" Component={AddGolfer}></Route>
				<Route
					path="/golfer-detail/edit/:id"
					Component={EditGolfer}
				></Route>
			</Routes>
			<SpeedInsights />
			<Footer />
		</BrowserRouter>
	);
}

export default App;
