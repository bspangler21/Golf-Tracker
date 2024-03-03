import { useFetchGolfers } from "../hooks/GolferHooks";
import { useFetchMatchScores } from "../hooks/MatchScoreHooks";
import { mockGolfers } from "../mockData/mockGolfers";
import { mockMatchScores } from "../mockData/mockMatchScores";
import { Golfer } from "../types/Golfer";
import { MatchScore } from "../types/MatchScore";

export function getGolferById(id: string, allGolfers: Golfer[]): Golfer {
	// const { data: golferData } = useFetchGolfers();
	let golfers: Golfer[] = allGolfers ?? mockGolfers;
	let golferDetail: Golfer = {} as Golfer;

	if (golfers) {
		golfers.forEach((g) => {
			if (g.id === id) {
				(golferDetail.id = g.id),
					(golferDetail.firstName = g.firstName),
					(golferDetail.lastName = g.lastName),
					(golferDetail.handicap = g.handicap);
			}
		});
	}

	return golferDetail;
}

export function getGolferMatchScores(golferId: string): MatchScore[] {
	const { data: matchScoreData } = useFetchMatchScores();
	let matchScores: MatchScore[] = matchScoreData ?? mockMatchScores;
	let golferMatchScores: MatchScore[] = matchScores.filter(
		(m) => m.golferId === golferId
	);
	return golferMatchScores;
}

export function getTotalScoresNumber(matchScores: MatchScore[]): number {
	let golferTotal: number = 0;

	for (let i = 0; i < matchScores.length; i++) {
		golferTotal += matchScores[i].totalScore;
	}

	return golferTotal;
}

export function getAllTimeAverage(matchScores: MatchScore[]): number {
	let golferTotal: number = 0;

	golferTotal = getTotalScoresNumber(matchScores);

	return golferTotal / matchScores.length;
}

export function getTotalScoresArray(matchScores: MatchScore[]): number[] {
	console.log(
		"matchScores.map",
		matchScores.map((m) => m.totalScore)
	);
	return matchScores.map((m) => m.totalScore);
}

export function calculateHandicap(
	matchScores: MatchScore[],
	slopeRating: number,
	courseRating: number
) {
	let golferTotalScores: number[] = getTotalScoresArray(matchScores);

	let golferDifferentialsArray: number[] = [];
	let golferDifferentialsTotal: number = 0;
	for (let i = 0; i < golferTotalScores.length; i++) {
		golferDifferentialsArray.push(
			(golferTotalScores[i] - courseRating) * (113 / slopeRating)
		);
	}
	golferDifferentialsTotal = golferDifferentialsArray.reduce(
		(total, golferDifferential) => total + (golferDifferential ?? 0)
	);
	return Math.round(
		golferDifferentialsTotal / golferDifferentialsArray.length
	);
}
