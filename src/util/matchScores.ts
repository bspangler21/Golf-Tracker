import { MatchScore } from "../types/MatchScore";

export function getMatchScoresByMatchId(id: string, matchScores: MatchScore[]) {
	// let matchScoresListing: MatchScore[] = [];

	return matchScores.filter((matchScore) => matchScore.matchId === id);
}
