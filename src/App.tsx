import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Golfers from "./pages/golfers/Golfers";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/golfers" element={<Golfers />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
