// import { mergeStyleSets } from "@fluentui/react";
import { mockDates } from "../../mockData/mockDates";
import { useNavigate } from "react-router-dom";

const mockDatesList = mockDates;
console.log("mockDatesList", mockDatesList);

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

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Week Number</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{mockDatesList &&
						mockDatesList.map((mockDate) => (
							<tr
								key={mockDate.id}
								onClick={() => nav(`/matches/${mockDate.id}`)}
							>
								<td>{mockDate.matchWeekNumber}</td>
								<td>
									{mockDate.matchDate.toLocaleDateString()}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
