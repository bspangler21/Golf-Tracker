// import { mergeStyleSets } from "@fluentui/react";
// import { useFetchData } from "../../hooks/GolferHooks";
import { DefaultButton, FontIcon, mergeStyles } from "@fluentui/react";
import { mockDates } from "../../mockData/mockDates";
import { useNavigate } from "react-router-dom";
import { useDeleteDate, useFetchDates } from "../../hooks/LeagueDateHooks";
import { LeagueDate } from "../../types/LeagueDate";

const iconClass = mergeStyles({
	fontSize: 25,
	height: 25,
	width: 25,
	margin: "0 5px",
});

// const classNames = mergeStyleSets({
// 	tableTextColor: {
// 		color: "#000000",
// 		width: "100vh",
// 		height: "100vh",
// 	},
// 	tableHeader: {
// 		width: "50%",
// 		border: "2px #000000",
// 		verticalAlign: "middle",
// 		// display: "flex",
// 		// flexDirection: "row",

// 		flexGrow: "1",
// 	},
// 	tableRow: {
// 		// display: "flex",
// 		flexDirection: "column",
// 		borderBottom: "1px #000000",
// 		verticalAlign: "middle",
// 	},
// });
let dates: LeagueDate[] = [];

const ScheduleList = () => {
	const nav = useNavigate();
	const { data } = useFetchDates();
	const deleteDateMutation = useDeleteDate();
	dates = data ?? mockDates;

	if (import.meta.env.DEV) {
		console.log("dates", dates);
	}

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<table>
					<thead>
						<tr>
							<th>Week Number</th>
							<th>Date</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{dates &&
							dates.map((date) => (
								<tr key={date.id}>
									<td
										onClick={() =>
											nav(`/matches/${date.id}`)
										}
									>
										{date.matchWeekNumber}
									</td>
									<td
										onClick={() =>
											nav(`/matches/${date.id}`)
										}
									>
										{new Date(
											date.matchDate
										).toLocaleDateString()}
									</td>
									<td
										onClick={() =>
											nav(
												`/schedule-list/edit/${date.id}`
											)
										}
									>
										<FontIcon
											aria-label="Edit"
											iconName="Edit"
											className={iconClass}
										/>
									</td>
									<td
										onClick={() => {
											if (
												window.confirm(
													"Are you sure you want to delete this date?"
												)
											) {
												deleteDateMutation.mutate(date);
											}
										}}
									>
										<FontIcon
											aria-label="Delete"
											iconName="Delete"
											className={iconClass}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<br></br>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<DefaultButton onClick={() => nav(`/add-date`)}>
					Add Date
				</DefaultButton>
			</div>
		</>
	);
};

export default ScheduleList;
