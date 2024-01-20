import { useParams } from "react-router-dom";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { useFetchDates } from "../../hooks/LeagueDateHooks";
import { useFetchMatches } from "../../hooks/MatchHooks";
import { useFetchMatchScores } from "../../hooks/MatchScoreHooks";
import Scorecard from "./Scorecard";
import { mockDates } from "../../mockData/mockDates";
import { mockGolfers } from "../../mockData/mockGolfers";
import { mockMatchScores } from "../../mockData/mockMatchScores";
import { mockMatches } from "../../mockData/mockMatches";
import { MatchScore } from "../../types/MatchScore";
import { Golfer } from "../../types/Golfer";
import { LeagueDate } from "../../types/LeagueDate";
import { Match } from "../../types/Match";
import { getMatchScoresById } from "../../util/matchScores";

let golfers: Golfer[] = [];
let matches: Match[] = [];
let dates: LeagueDate[] = [];
let matchScores: MatchScore[] = [];
let currentMatchScores: MatchScore[] = [];
let currentMatchId = "1";

const EditScorecard = () => {
	const { data: matchesData } = useFetchMatches();
	const { data: dateData } = useFetchDates();
	const { data: golferData } = useFetchGolfers();
	const { data: matchScoreData } = useFetchMatchScores();
	const { golfer1Id, golfer2Id, matchId, dateId } = useParams();
	let golfer1Data: any = {};
	let golfer2Data: any = {};

	currentMatchId = matchId ?? "1";
	dates = dateData ?? mockDates;
	matches = matchesData ?? mockMatches;
	matchScores = matchScoreData ?? mockMatchScores;
	golfers = golferData ?? mockGolfers;
	currentMatchScores = getMatchScoresById(currentMatchId, matchScores);
	if (currentMatchScores.length > 0) {
		golfer1Data =
			currentMatchScores.filter(
				(score) => score.golferId && score.golferId === golfer1Id
			)[0] ?? {};

		golfer2Data =
			currentMatchScores.filter(
				(score) => score.golferId && score.golferId === golfer2Id
			)[0] ?? {};

		console.log("golfer1Data", golfer1Data);
	}

	return (
		<Scorecard
			golfer1={golfer1Data}
			golfer2={golfer2Data}
			currentMatchScores={currentMatchScores}
      isEdit={true}
		></Scorecard>
	);
};

export default EditScorecard;