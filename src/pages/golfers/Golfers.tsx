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

// const golfers = mockGolfers;
// const testGolfers = mockGolfers;

// function fetchGolfers() {
// 	const returnedGolfers = fetch("http://localhost:4000/api/Golfers").then((response) => response.json());
// 	return returnedGolfers;
// }

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

	useEffect(() => {
		setGolfers(data ?? mockGolfers);
	}, [data]);

	// useEffect(() => {
	// 	const getGolfers = async () => {
	// 		const golfersFromServer = await fetchGolfers();
	// 		setGolfers(golfersFromServer);
	// 	};

	// 	getGolfers();
	// }, []);

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
							<th>First Name</th>
							<th>Last Name</th>
							<th>Handicap</th>
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
		</>
	);
};

export default Golfers;
