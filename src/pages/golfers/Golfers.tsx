// import { ReactNode, useState } from "react";
import { mockGolfers } from "../../mockData/mockGolfers";
import Table from "react-bootstrap/Table";
import utilStyles from "../../styles/utilStyles.module.css";
// import golfersListStyles from "./Golfers.css";
import { useNavigate } from "react-router-dom";
import { DefaultButton, FontIcon, mergeStyles } from "@fluentui/react";
import { Golfer } from "../../types/Golfer";
import { useEffect, useState } from "react";
import { useDeleteGolfer, useFetchGolfers } from "../../hooks/GolferHooks";
import { saveAs } from "file-saver";

// const golfers = mockGolfers;
// const testGolfers = mockGolfers;

// function fetchGolfers() {
// 	const returnedGolfers = fetch("http://localhost:4000/api/Golfers").then((response) => response.json());
// 	return returnedGolfers;
// }

// const classes = mergeStyles({
// 	tableHeaderFormat: {
// 		width: "150px",
// 	},
// });

const iconClass = mergeStyles({
	fontSize: 25,
	height: 25,
	width: 25,
	margin: "0 5px",
});

const Golfers = () => {
	const nav = useNavigate();
	const [golfers, setGolfers] = useState<Golfer[]>([]);
	const { data } = useFetchGolfers();

	const deleteGolferMutation = useDeleteGolfer();

	let csvContent = "First Name,Last Name,Handicap\n";

	useEffect(() => {
		setGolfers(data ?? mockGolfers);
	}, [data]);

	const exportGolfersToCSV = () => {
		// Convert golfers data to CSV format

		golfers.forEach((g) => {
			csvContent += `${g.firstName},${g.lastName},${g.handicap}\n`;
			console.log(csvContent);
		});

		// Create a Blob with the CSV content
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

		// Save the Blob as a CSV file
		saveAs(blob, "golfers.csv");
	};

	console.log("csvContent: ", csvContent);

	return (
		<>
			<div className={utilStyles.container}>
				<Table
					// hover
					responsive
					// variant="dark"
					// size="lg"
					className={utilStyles.table}
				>
					<thead>
						<tr>
							<th className={utilStyles.tableHeaderWidth}>
								First Name
							</th>
							<th className={utilStyles.tableHeaderWidth}>
								Last Name
							</th>
							<th className={utilStyles.tableHeaderWidth}>
								Handicap
							</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{golfers.map((g) => (
							<>
								<tr
									key={g.id}
									// onClick={() =>
									// 	nav(`/golfer-detail/${g.id}`)
									// }
								>
									<td
										onClick={() =>
											nav(`/golfer-detail/${g.id}`)
										}
									>
										{g.firstName}
									</td>
									<td
										onClick={() =>
											nav(`/golfer-detail/${g.id}`)
										}
									>
										{g.lastName}
									</td>
									<td
										onClick={() =>
											nav(`/golfer-detail/${g.id}`)
										}
									>
										{g.handicap}
									</td>
									<td
										onClick={() =>
											nav(`/golfer-detail/edit/${g.id}`)
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
													"Are you sure you want to delete this golfer?"
												)
											) {
												deleteGolferMutation.mutate(g);
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
							</>
						))}
					</tbody>
				</Table>
			</div>
			<br />
			<div>
				<DefaultButton
					primary={true}
					onClick={() => {
						nav("/add-golfer");
					}}
				>
					Add Golfer
				</DefaultButton>
			</div>
			<br />
			<div>
				<DefaultButton primary={true} onClick={exportGolfersToCSV}>
					Export Golfers to CSV
				</DefaultButton>
			</div>
		</>
	);
};

export default Golfers;
