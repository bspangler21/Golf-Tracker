import { Link } from "react-router-dom";

import utilStyles from "../styles/utilStyles.module.css";

const Header = () => {
	return (
		<div>
			<nav className={utilStyles.navBar}>
				<Link to="/home">Home</Link>
				{" | "}
				<Link to="/golfers">Golfers</Link>
				{" | "}
				<Link to="/schedule-list">Schedule</Link>
				{" | "}
				<Link to="/scorecard">Scorecard</Link>
			</nav>
		</div>
	);
};

export default Header;
