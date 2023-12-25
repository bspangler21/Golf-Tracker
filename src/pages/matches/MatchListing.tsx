import { useNavigate, useParams } from "react-router-dom";
// import { mockMatches } from "../../mockData/mockMatches";
import { getGolferById } from "../../util/golfers";
import { getMatchesByDateId, getMatchesByPlayerId } from "../../util/matches";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { mockGolfers } from "../../mockData/mockGolfers";
// import { mockMatches } from "../../mockData/mockMatches";

// const allMatches = mockMatches;

interface MatchListingProps {
	isPlayerView?: boolean;
	playerId?: string;
}

const MatchListing = ({
	isPlayerView = false,
	playerId,
}: MatchListingProps) => {
	const nav = useNavigate();
	const { id } = useParams();
	if (!id) throw Error("Date id not found");
	// const dateId = parseInt(id as string);
	const dateId = id;
	const { data } = useFetchGolfers();
	console.log("dateId", dateId);
	console.log("isPlayerView", isPlayerView);
	console.log("playerId in MatchListing", playerId);
	// const matchesList =
	// 	isPlayerView && playerId
	// 		? getMatchesByPlayerId(Number(playerId))
	// 		: getMatchesByDateId(dateId);

	const matchesList =
			isPlayerView && playerId
				? getMatchesByPlayerId(playerId)
				: getMatchesByDateId(dateId);

		console.log("matchesList", matchesList);

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
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
										`/scorecard/${match.golfer1Id}/${match.golfer2Id}/${dateId}`
									)
								}
							>
								<td>{match.id}</td>
								<td>
									{getGolferById(match.golfer1Id, data ?? mockGolfers).firstName}{" "}
									{getGolferById(match.golfer1Id, data ?? mockGolfers).lastName}{" "}
									vs.{" "}
									{getGolferById(match.golfer2Id, data ?? mockGolfers).firstName}{" "}
									{getGolferById(match.golfer2Id, data ?? mockGolfers).lastName}{" "}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default MatchListing;
