import { useNavigate, useParams } from "react-router-dom";
// import { mockMatches } from "../../mockData/mockMatches";
import { getGolferById } from "../../util/golfers";
import { getMatchesByDateId } from "../../util/matches";

const MatchListing = () => {
	const nav = useNavigate();
	const { id } = useParams();
	if (!id) throw Error("Date id not found");
	const dateId = parseInt(id as string);
	console.log("dateId", dateId);
	const matchesList = getMatchesByDateId(dateId);

	console.log("matchesList", matchesList);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Match Number</th>
						<th>Matchup</th>
					</tr>
				</thead>
				<tbody>
					{matchesList &&
						matchesList.map((match) => (
							<tr
								key={match.id}
								onClick={() =>
									nav(
										`/scorecard/${match.golfer1Id}/${match.golfer2Id}`
									)
								}
							>
								<td>{match.id}</td>
								<td>
									{getGolferById(match.golfer1Id).firstName}{" "}
									{getGolferById(match.golfer1Id).lastName}{" "}
									vs.{" "}
									{getGolferById(match.golfer2Id).firstName}{" "}
									{getGolferById(match.golfer2Id).lastName}{" "}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default MatchListing;
