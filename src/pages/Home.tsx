import { DefaultButton, IStackTokens, Stack } from "@fluentui/react";
import "./Home.css";
// import { useNavigate } from "react-router-dom";

// const nav = useNavigate();

const stackStyles: IStackTokens = {
	childrenGap: 20,
};

export default function Home() {
	return (
		<div>
			<h1 className="Header">Welcome to the Golf Tracker!</h1>
			{/* <Stack horizontal styles={stackStyles} */}
			<Stack horizontal tokens={stackStyles}>
				<DefaultButton primary={true} href={`/`}>
					Back
				</DefaultButton>
				<DefaultButton href={`/login`}>Login</DefaultButton>
				<DefaultButton href={`/schedule`}>Schedule</DefaultButton>
			</Stack>
		</div>
	);
}
