import {
	DefaultButton,
	IStackTokens,
	Stack,
	StackItem,
	Text,
	mergeStyleSets,
} from "@fluentui/react";
import "./Home.css";
// import { useNavigate } from "react-router-dom";

// const nav = useNavigate();
const classNames = mergeStyleSets({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		height: "100vh",
		// paddingLeft: "60%",
		width: "100vw",
		color: "black",
	},
	buttonContainer: {
		display: "flex",
		flexGrow: "1",
		// paddingLeft: "36%",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "200px",
		backgroundColor: "black",
		color: "white",
		justifyContent: "center",
		alignItems: "center",
	},
});

const stackStyles: IStackTokens = {
	childrenGap: 20,
};

export default function Home() {
	return (
		<div className={classNames.container}>
			<div className="column">
				<h1 className="Header">Welcome to the Golf Tracker!</h1>
				{/* <Stack horizontal styles={stackStyles} */}
				<div className={classNames.buttonContainer}>
					<Stack tokens={stackStyles}>
						<Stack.Item>
							<DefaultButton
								href={`/login`}
								className={classNames.button}
							>
								Login
							</DefaultButton>
						</Stack.Item>
						<Stack.Item>
							<DefaultButton
								href={`/golfers`}
								className={classNames.button}
							>
								View Golfers
							</DefaultButton>
						</Stack.Item>
					</Stack>
				</div>
			</div>
		</div>
	);
}
