// import { mergeStyleSets } from "@fluentui/react";
// import { useFetchData } from "../../hooks/GolferHooks";
import { DefaultButton } from "@fluentui/react";
import { mockDates } from "../../mockData/mockDates";
import { useNavigate } from "react-router-dom";
import { useFetchLeagueDates } from "../../hooks/LeagueDateHooks";
import { LeagueDate } from "../../types/LeagueDate";

// const mockDatesList = mockDates;
// console.log("mockDatesList", mockDatesList);

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
	const { data } = useFetchLeagueDates();
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
						</tr>
					</thead>
					<tbody>
						{dates &&
							dates.map((date) => (
								<tr
									key={date.id}
									onClick={() => nav(`/matches/${date.id}`)}
								>
									<td>{date.matchWeekNumber}</td>
									<td>
										{new Date(
											date.matchDate
										).toLocaleDateString()}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<br></br>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<DefaultButton>Add Date</DefaultButton>
			</div>
		</>
	);
};

export default ScheduleList;
