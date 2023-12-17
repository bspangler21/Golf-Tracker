// import { ReactNode, useState } from "react";
import { mockGolfers } from "../../mockData/mockGolfers";
import Table from "react-bootstrap/Table";
import utilStyles from "../../styles/utilStyles.module.css";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "@fluentui/react";

const golfers = mockGolfers;

const Golfers = () => {
	const nav = useNavigate();

	return (
		<>
			<div className={utilStyles.container}>
				<Table
					// hover
					responsive
					// variant="dark"
					size="lg"
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
			<div>
				<DefaultButton
					primary={true}
					onClick={() => {
						nav("/login");
					}}
				>
					Login
				</DefaultButton>
			</div>
		</>
	);
};

export default Golfers;
