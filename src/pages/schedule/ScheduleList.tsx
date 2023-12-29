// import { mergeStyleSets } from "@fluentui/react";
// import { useFetchData } from "../../hooks/GolferHooks";
import { mockDates } from "../../mockData/mockDates";
import { useNavigate } from "react-router-dom";

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

export default function ScheduleList() {
	const nav = useNavigate();
	// const { data } = useFetchData("golfers");
	// dates = data ?? mockDates;
	let dates = mockDates;

	return (
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
									{date.matchDate.toLocaleDateString()}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
