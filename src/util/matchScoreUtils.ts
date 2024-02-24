import { useFetchHoles } from "../hooks/HoleHooks";
import { useFetchMatchScores } from "../hooks/MatchScoreHooks";
import { mockCourses } from "../mockData/mockCourses";
import { mockHoles } from "../mockData/mockHoles";
import { Course } from "../types/Course";
import { Hole } from "../types/Hole";
import { MatchScore } from "../types/MatchScore";
import { getLakeBreeze } from "./courseUtils";
import { calculateHandicap, getGolferMatchScores } from "./golferUtils";
import { getHardestHoles } from "./holeUtils";

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
	// const { data: matchScoreData } = useFetchMatchScores();
	const { data: holeData } = useFetchHoles();
	let holes: Hole[] = holeData ?? mockHoles;
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
	getHardestHoles(
		course?.id !== undefined ? course?.id : "",
		Math.abs(golfer1Handicap - golfer2Handicap)
	);

	return matchPoints;
}
