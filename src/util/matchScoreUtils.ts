import { useFetchMatchScores } from "../hooks/MatchScoreHooks";
import { mockCourses } from "../mockData/mockCourses";
import { Course } from "../types/Course";
import { MatchScore } from "../types/MatchScore";
import { getLakeBreeze } from "./courseUtils";
import { calculateHandicap, getGolferMatchScores } from "./golferUtils";

let LakeBreezeCourseId: string = "658cfca75669234ca16a65d8";
const course: Course | undefined = getLakeBreeze(
	LakeBreezeCourseId,
	mockCourses
);

export function getMatchScoresByMatchId(id: string, matchScores: MatchScore[]) {
	return matchScores.filter((matchScore) => matchScore.matchId === id);
}

export function calculateMatchPoints(
	golfer1Id: string,
	golfer1Scores: MatchScore,
	golfer2Id: string,
	golfer2Scores: MatchScore
) {
	let matchPoints: number = 0;
	const { data: matchScoreData } = useFetchMatchScores();
	let golfer1Handicap: number =
		(course &&
			calculateHandicap(
				getGolferMatchScores(golfer1Id),
				course?.slopeRating,
				course?.courseRating / 2
			)) ??
		0;
	let golfer2Handicap: number =
		(course &&
			calculateHandicap(
				getGolferMatchScores(golfer2Id),
				course?.slopeRating,
				course?.courseRating / 2
			)) ??
		0;

	// use slice to get the number of holes with the highest handicaps based on difference between golfer1 and golfer2 handicap

	return matchPoints;
}
