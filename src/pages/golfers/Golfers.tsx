// import { ReactNode, useState } from "react";
import { mockGolfers } from "../../mockData/mockGolfers";
import Table from "react-bootstrap/Table";
import utilStyles from "../../styles/utilStyles.module.css";
// import golfersListStyles from "./Golfers.css";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "@fluentui/react";
import { Golfer } from "../../types/Golfer";
import { useEffect, useState } from "react";
import { useFetchGolfers } from "../../hooks/GolferHooks";

// const golfers = mockGolfers;
// const testGolfers = mockGolfers;

// function fetchGolfers() {
// 	const returnedGolfers = fetch("http://localhost:4000/api/Golfers").then((response) => response.json());
// 	return returnedGolfers;
// }

const Golfers = () => {
	const nav = useNavigate();
	const [golfers, setGolfers] = useState<Golfer[]>([]);
	const { data } = useFetchGolfers();

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
							<th>Handicap</th>
							<th>First Name</th>
							<th>Last Name</th>
						</tr>
					</thead>
					<tbody>
						{golfers.map((g) => (
							<>
								<tr
									key={g.id}
									onClick={() =>
										nav(`/golfer-detail/${g.id}`)
									}
								>
									<td>{g.handicap}</td>
									<td>{g.firstName}</td>
									<td>{g.lastName}</td>
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
