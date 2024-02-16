import { useNavigate, useParams } from "react-router-dom";
import { mockMatches } from "../../mockData/mockMatches";
import { getGolferById } from "../../util/golferUtils";
import {
	getMatchesByPlayerId,
	getMatchesByWeekNumber,
} from "../../util/matchUtils";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { mockGolfers } from "../../mockData/mockGolfers";
import { Golfer } from "../../types/Golfer";
import { mockDates } from "../../mockData/mockDates";
import { Match } from "../../types/Match";
import { LeagueDate } from "../../types/LeagueDate";
import { useFetchDates } from "../../hooks/LeagueDateHooks";
import { getMatchScoresByMatchId } from "../../util/matchScoreUtils";
import { useFetchMatchScores } from "../../hooks/MatchScoreHooks";
import { MatchScore } from "../../types/MatchScore";
import { mockMatchScores } from "../../mockData/mockMatchScores";
import { useFetchMatches } from "../../hooks/MatchHooks";

const wpsLeagueId = "658cf9da5669234ca16a65c8";
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
	const { weekNumber } = useParams();
	// if (!weekNumber) throw Error("Date id not found");
	// const dateId = parseInt(id as string);
	const weekNumberParam = weekNumber;
	// const { data: golfersData } = useFetchData("golfers");
	const { data: golfersData } = useFetchGolfers();
	const { data: datesData } = useFetchDates();
	const { data: matchScoreData } = useFetchMatchScores();
	const { data: matchesData } = useFetchMatches();

	golfers = golfersData ?? mockGolfers;
	// matches = (matchesData as Match[]) ?? mockMatches;
	dates = datesData ?? mockDates;
	matches = matchesData ?? mockMatches;
	let matchScores: MatchScore[] = matchScoreData ?? mockMatchScores;

	console.log("dates", dates);

	const matchesList =
		isPlayerView && playerId
			? getMatchesByPlayerId(playerId, matches)
			: getMatchesByWeekNumber(
					parseInt(weekNumberParam),
					wpsLeagueId,
					matches
			  );

	if (import.meta.env.DEV) {
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
									match.id &&
									getMatchScoresByMatchId(
										match.id,
										matchScores
									).length > 0
										? nav(
												`/scorecard/edit/${match.golfer1Id}/${match.golfer2Id}/${match.id}`
										  )
										: nav(
												`/scorecard/add/${match.golfer1Id}/${match.golfer2Id}/${match.id}`
										  )
								}
							>
								<td>{matchesList.indexOf(match) + 1}</td>
								<td>
									{match.golfer1Id &&
										getGolferById(match.golfer1Id)
											.firstName}{" "}
									{match.golfer1Id &&
										getGolferById(match.golfer1Id)
											.lastName}{" "}
									vs.{" "}
									{match.golfer2Id &&
										getGolferById(match.golfer2Id)
											.firstName}{" "}
									{match.golfer2Id &&
										getGolferById(match.golfer2Id)
											.lastName}{" "}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default MatchListing;
