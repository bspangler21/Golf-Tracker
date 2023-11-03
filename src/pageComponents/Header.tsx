import { Link } from "@fluentui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import utilStyles from "../styles/utilStyles.module.css";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <div>
      <nav className={utilStyles.navBar}>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/golfers">Golfers</Link>
        {" | "}
        <Link href="/schedule-list">Schedule</Link>
      </nav>
    </div>
  );
};

export default Header;
