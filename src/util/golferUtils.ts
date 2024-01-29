import { Golfer } from "../types/Golfer";
import { MatchScore } from "../types/MatchScore";
// import { mockGolfers } from "../mockData/mockGolfers";
// import { useFetchGolfers } from "../hooks/GolferHooks";

// const golfers: Golfer[] = mockGolfers;
// const testGolfers: Golfer[] = mockGolfers;
// const { data: golfers } = useFetchGolfers() ?? [];

// export function getAllGolferIds() {
// 	return (golfers as Golfer[]).map((i) => {
// 		return {
// 			params: {
// 				id: i.id,
// 			},
// 		};
// 	});
// }

// export function fetchGolfers() {
// 	const returnedGolfers = fetch("http://localhost:4000/api/Golfers").then(
// 		(response) => response.json()
// 	);
// 	return returnedGolfers;
// }

export function getGolferById(id: string, golfers: Golfer[]): Golfer {
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

export function getGolferMatchScores(
	matchScores: MatchScore[],
	golferId: string
): MatchScore[] {
	return matchScores.filter((m) => m.golferId === golferId);
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
