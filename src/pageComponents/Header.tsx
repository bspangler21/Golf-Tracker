import { Link } from "@fluentui/react";

import utilStyles from "../styles/utilStyles.module.css";

const Header = () => {
	return (
		<div>
			<nav className={utilStyles.navBar}>
				<Link href="/home">Home</Link>
				{" | "}
				<Link href="/golfers">Golfers</Link>
				{" | "}
				<Link href="/schedule-list">Schedule</Link>
				{" | "}
				<Link href="/scorecard">Scorecard</Link>
			</nav>
		</div>
	);
};

export default Header;
