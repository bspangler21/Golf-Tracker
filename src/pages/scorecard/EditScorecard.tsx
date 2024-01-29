import { useParams } from "react-router-dom";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { useFetchDates } from "../../hooks/LeagueDateHooks";
import { useFetchMatches } from "../../hooks/MatchHooks";
import {
	useFetchMatchScores,
	useUpdateMatchScore,
} from "../../hooks/MatchScoreHooks";
import Scorecard from "./Scorecard";
import { mockDates } from "../../mockData/mockDates";
import { mockGolfers } from "../../mockData/mockGolfers";
import { mockMatchScores } from "../../mockData/mockMatchScores";
import { mockMatches } from "../../mockData/mockMatches";
import { MatchScore } from "../../types/MatchScore";
import { Golfer } from "../../types/Golfer";
import { LeagueDate } from "../../types/LeagueDate";
import { Match } from "../../types/Match";
import { getMatchScoresByMatchId } from "../../util/matchScores";
import ValidationSummary from "../../pageComponents/ValidationSummary";

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
	const updateMatchScore = useUpdateMatchScore(dateId ?? "");
	let golfer1Data: MatchScore = {
		id: "",
		matchId: "",
		golferId: "",
		totalScore: 0,
		holeScores: [],
	};
	let golfer2Data: MatchScore = {
		id: "",
		matchId: "",
		golferId: "",
		totalScore: 0,
		holeScores: [],
	};

	currentMatchId = matchId ?? "1";
	dates = dateData ?? mockDates;
	matches = matchesData ?? mockMatches;
	matchScores = matchScoreData ?? mockMatchScores;
	golfers = golferData ?? mockGolfers;
	currentMatchScores = getMatchScoresByMatchId(currentMatchId, matchScores);
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
		<>
			{updateMatchScore.isError && (
				<ValidationSummary error={updateMatchScore.error} />
			)}
			<Scorecard
				golfer1={golfer1Data}
				golfer2={golfer2Data}
				// isEdit={true}
				submitted={(matchScore) => {
					updateMatchScore.mutate(matchScore);
				}}
			></Scorecard>
		</>
	);
};

export default EditScorecard;
