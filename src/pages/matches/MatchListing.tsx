import { useNavigate, useParams } from "react-router-dom";
import { mockMatches } from "../../mockData/mockMatches";
import { getGolferById } from "../../util/golfers";
import { getMatchesByDateId, getMatchesByPlayerId } from "../../util/matches";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { mockGolfers } from "../../mockData/mockGolfers";
import { Golfer } from "../../types/Golfer";
import { mockDates } from "../../mockData/mockDates";
import { Match } from "../../types/Match";
import { LeagueDate } from "../../types/LeagueDate";
import { useFetchDates } from "../../hooks/LeagueDateHooks";

let golfers: Golfer[] = [];



interface MatchListingProps {
	isPlayerView?: boolean;
	playerId?: string;
}

const MatchListing = ({
	isPlayerView = false,
	playerId,
}: MatchListingProps) => {
	let dates: LeagueDate[] = [];
	let matches: Match[] = [];
	const nav = useNavigate();
	const { id } = useParams();
	if (!id) throw Error("Date id not found");
	// const dateId = parseInt(id as string);
	const dateId = id;
	// const { data: golfersData } = useFetchData("golfers");
	const { data: golfersData } = useFetchGolfers();
	const { data: datesData } = useFetchDates();

	golfers = golfersData ?? mockGolfers;
	// matches = (matchesData as Match[]) ?? mockMatches;
	dates = datesData ?? mockDates;
	matches = mockMatches;

	console.log("dates", dates);
	
	const matchesList =
		isPlayerView && playerId
			? getMatchesByPlayerId(playerId, matches)
			: getMatchesByDateId(dateId, matches);

	if (import.meta.env.DEV) {
		console.log("dateId", dateId);
		console.log("isPlayerView", isPlayerView);
		console.log("playerId in MatchListing", playerId);
		console.log("matchesList", matchesList);
	}

	

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<table>
				<thead>
					<tr>
						<th>Match Number</th>
						<th>Matchup</th>
						<th>Tee Time</th>
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
								<td>{matchesList.indexOf(match) + 1}</td>
								<td>
									{
										getGolferById(match.golfer1Id, golfers)
											.firstName
									}{" "}
									{
										getGolferById(match.golfer1Id, golfers)
											.lastName
									}{" "}
									vs.{" "}
									{
										getGolferById(match.golfer2Id, golfers)
											.firstName
									}{" "}
									{
										getGolferById(match.golfer2Id, golfers)
											.lastName
									}{" "}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default MatchListing;
