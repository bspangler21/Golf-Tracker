import { useEffect } from "react";
import { getGolferById } from "../util/golferUtils";
import { Golfer } from "../types/Golfer";

let golfers: Golfer[] = [];
const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

useEffect(() => {
	fetch(`${apiURL}/api/Golfers`)
		.then((response) => response.json())
		.then((data) =>
			data.array.forEach((g) => {
				golfers.push(g);
			})
		);
}, golfers);

const Matches = (matchups: any[]) => {
	return (
		<>
			{matchups.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Week Number</th>
							<th>Date</th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{matchups.map((matchup) => {
							return matchup.map((match) => {
								return (
									<tr
										key={
											match.weekNumber +
											match.golfer1Id +
											match.golfer2Id
										}
									>
										<td>{match.weekNumber}</td>
										<td>
											$
											{getGolferById(
												match.golfer1Id,
												golfers
											).firstName ?? ""}{" "}
											{getGolferById(
												match.golfer1Id,
												golfers
											).lastName ?? ""}
											{" vs. "}
											{getGolferById(
												match.golfer2Id,
												golfers
											).firstName ?? ""}{" "}
											{getGolferById(
												match.golfer2Id,
												golfers
											).lastName ?? ""}
										</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Matches;
