import { MatchScore } from "../types/MatchScore";

export function getMatchScoresById(id: string, matchScores: MatchScore[]) {
	// let matchScoresListing: MatchScore[] = [];

	return matchScores.filter((matchScore) => matchScore.matchId === id);
}
