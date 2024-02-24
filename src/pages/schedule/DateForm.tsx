import { DatePicker, mergeStyleSets } from "@fluentui/react";
import { LeagueDate } from "../../types/LeagueDate";
import { useState } from "react";

const classNames = mergeStyleSets({
	wrapper: {
		height: "100vh",
		display: "block",
	},
	mainContentWrapper: {
		alignItems: "center",
	},
	textField: {
		width: "200px",
		boxSizing: "border-box",
		padding: "20px",
		minWidth: "200px",
	},
});

type Args = {
	leagueDate: LeagueDate;
	submitted: (leagueDate: LeagueDate) => void;
	isEdit: boolean;
};

const DateForm = ({ leagueDate, submitted, isEdit }: Args) => {
	const [dateState, setDateState] = useState({ ...leagueDate });

	const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
		console.log("dateState", dateState);
		e.preventDefault();
		submitted(dateState);
	};

	return (
		<div
			className={classNames.wrapper}
			style={{ display: "flex", justifyContent: "center" }}
		>
			<div className={classNames.textField}>
				<label htmlFor="matchDate">Date</label>
				<DatePicker
					placeholder="Select a date..."
					isRequired={true}
					value={
						isEdit
							? new Date(leagueDate.matchDate)
							: new Date(dateState.matchDate)
					}
					onSelectDate={(date) => {
						setDateState({
							...dateState,
							matchDate: date ?? new Date(),
						});
					}}
				/>
				<br></br>
				<br></br>
				<button type="submit" onClick={onSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default DateForm;
