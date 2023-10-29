import { ReactNode, useState } from "react";
import { mockGolfers } from "../../mockData/mockGolfers";
import Table from "react-bootstrap/Table";
import utilStyles from "../../styles/utilStyles.module.css";
import { useNavigate } from "react-router-dom";

const golfers = mockGolfers;

const Golfers = () => {
	const nav = useNavigate();

	return (
		<Table
			bordered
			hover
			responsive
			striped="columns"
			variant="dark"
			size="lg"
		>
			<thead>
				<tr className={utilStyles.tableHeader}>
					<th colSpan={2}>Handicap</th>
					<th colSpan={4}>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				{golfers.map((g) => (
					<>
						<tr
							key={g.id}
							onClick={() => nav(`/golfer-detail/${g.id}`)}
							className={utilStyles.tableBody}
						>
							<td colSpan={2}>{g.handicap}</td>
							<td colSpan={4}>{g.firstName}</td>
							<td>{g.lastName}</td>
						</tr>
					</>
				))}
			</tbody>
		</Table>
	);
};

export default Golfers;
