import { DefaultButton, Label, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
// import * as golfLogo from "../../assets/golf.png";

const loginStackTokens = {
	childrenGap: 30,
};

const forgotLinkStyles = {
	color: "blue",
};

export default function Login() {
	const [username, setUsername] = useState("");

	return (
		<>
			<Stack tokens={loginStackTokens}>
				<TextField
					placeholder="Username"
					required
					onChange={(e, newValue) => {
						setUsername(newValue || "");
					}}
					value={username}
				></TextField>
				<TextField placeholder="Password" required></TextField>
				<DefaultButton
					primary={true}
					onClick={() => console.log("submitted username ", username)}
				>
					Login
				</DefaultButton>
				<Link to={`/`} className="forgot-link">
					<Label>Forgot your username or password?</Label>
				</Link>
			</Stack>
		</>
	);
}
