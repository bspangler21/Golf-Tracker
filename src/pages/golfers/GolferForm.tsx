/**
 * Component for adding a new golfer.
 */
import { DefaultButton } from "@fluentui/react";
import { useState } from "react";
import { Golfer } from "../../types/Golfer";

type Args = {
	golfer: Golfer;
	submitted: (golfer: Golfer) => void;
};

const GolferForm = ({ golfer, submitted }: Args) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [handicap, setHandicap] = useState("");
	const [golferState, setGolferState] = useState({ ...golfer });

	console.log("firstName", firstName);
	console.log("handicap", handicap);

	/**
	 * Adds a new golfer with the provided information.
	 */
	const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
		console.log("golferState", golferState);
		e.preventDefault();
		submitted(golferState);
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
				// value={firstName}
				onChange={(e) =>
					setGolferState({
						...golferState,
						firstName: e.target.value,
					})
				}
				required={true}
			></input>{" "}
			<text>Last Name:</text>
			<input
				// value={lastName}
				onChange={(e) =>
					setGolferState({ ...golferState, lastName: e.target.value })
				}
			></input>{" "}
			<text>Handicap:</text>
			<input
				// value={handicap}
				onChange={(e) =>
					setGolferState({ ...golferState, handicap: Number(e.target.value)})
				}
			></input>
			<br />
			<br />
			<div>
				<DefaultButton onClick={() => onSubmit}>
					Save Golfer
				</DefaultButton>
			</div>
		</>
	);
};

export default GolferForm;
