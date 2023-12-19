import { DefaultButton } from "@fluentui/react";
import { useState } from "react";

const AddGolfer = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [handicap, setHandicap] = useState("");

	console.log("firstName", firstName);
	console.log("handicap", handicap);

	const addNewGolfer = () => {
		console.log(
			`First Name: ${firstName}, Last Name: ${lastName}, Handicap: ${handicap}`
		);
		alert(
			`First Name: ${firstName}, Last Name: ${lastName}, Handicap: ${handicap}`
		);
		// Here you can add the code to save the golfer's data

		// Clear the input fields
		setFirstName("");
		setLastName("");
		setHandicap("");
	};
	return (
		<>
			<text>First Name:</text>
			<input
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			></input>{" "}
			<text>Last Name:</text>
			<input
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			></input>{" "}
			<text>Handicap:</text>
			<input
				value={handicap}
				onChange={(e) => setHandicap(e.target.value)}
			></input>
			<br />
			<br />
			<div>
				<DefaultButton onClick={() => addNewGolfer()}>
					Save Golfer
				</DefaultButton>
			</div>
		</>
	);
};

export default AddGolfer;
