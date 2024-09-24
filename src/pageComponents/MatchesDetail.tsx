import { useEffect } from "react";
import { getGolferById } from "../util/golferUtils";
import { Golfer } from "../types/Golfer";
import { Match } from "../types/Match";
import { useFetchGolfers } from "../hooks/GolferHooks";
import { mockGolfers } from "../mockData/mockGolfers";
import { DefaultButton } from "@fluentui/react";
import axios from "axios";
import { formatDate } from "../util/generalUtils";


let golfers: Golfer[] = [];
const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

interface MatchesDetailProps {
	matchups: any[];
}

const MatchesDetail = ({ matchups }: MatchesDetailProps) => {
	// useEffect(() => {
	// 	let golferResponse = fetch(`${apiURL}/api/Golfers`)
	// 		.then((response) => response.json())
	// 		.then((data) =>
	// 			data.array.forEach((g) => {
	// 				golfers.push(g);
	// 			})
	// 		);
	// 	console.log("golferResponse", golferResponse);
	// }, [golfers]);
	console.log("matchups", matchups);
	const storedMatchups = JSON.parse(
		localStorage.getItem("finalMatchups") || "[]"
	);
	console.log("storedMatchups", storedMatchups);
	const { data: golfersData } = useFetchGolfers();
	golfers = golfersData ?? mockGolfers;
	console.log("golfers", golfers);

	return (
		<>
			{
				<table>
					<thead>
						<tr>
							<th>Week Number</th>
							<th>Date</th>
							<th>Matchup</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{storedMatchups.map((matchup) => {
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
										<td>{formatDate(match.matchDate)}</td>
										<td>
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
										<td>
											<DefaultButton
												onClick={() => {
													axios.post(
														`${apiURL}/api/Matches`,
														match
													);
												}}
											>
												Add
											</DefaultButton>
										</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
			}
		</>
	);
};

export default MatchesDetail;
