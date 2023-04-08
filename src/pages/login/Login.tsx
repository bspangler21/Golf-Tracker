import { DefaultButton, Stack, TextField } from "@fluentui/react";
// import * as golfLogo from "../../assets/golf.png";

const loginStackTokens = {
	childrenGap: 30,
};

export default function Login() {
	return (
		<>
			<Stack tokens={loginStackTokens}>
				<TextField placeholder="Username"></TextField>
				<TextField placeholder="Password"></TextField>
				<DefaultButton primary={true}>Login</DefaultButton>
			</Stack>
		</>
	);
}
