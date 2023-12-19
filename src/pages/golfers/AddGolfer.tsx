/**
 * Component for adding a new golfer.
 */
import { DefaultButton } from "@fluentui/react";
import { useState } from "react";

const AddGolfer = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [handicap, setHandicap] = useState("");

	console.log("firstName", firstName);
	console.log("handicap", handicap);

	/**
	 * Adds a new golfer with the provided information.
	 */
	const addNewGolfer = () => {
		// Validate the input fields
		/**
		 * Validates the input fields for adding a golfer.
		 * Displays an alert and the function returns if any of the fields are empty.
		 *
		 */
		if (!firstName.trim() || !lastName.trim() || !handicap.trim()) {
			alert("All fields are required");
			return;
		}
		/**
		 * Validates if the handicap is a number.
		 * If the handicap is not a number, an alert is displayed and the function returns.
		 */
		if (isNaN(Number(handicap))) {
			alert("Handicap must be a number");
			return;
		}

		console.log(
			`First Name: ${firstName.trim()}, Last Name: ${lastName.trim()}, Handicap: ${handicap.trim()}`
		);
		alert(
			`First Name: ${firstName.trim()}, Last Name: ${lastName.trim()}, Handicap: ${handicap.trim()}`
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
				required={true}
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
