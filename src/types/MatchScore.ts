export type MatchScore = {
	leagueId: number;
	matchId: number;
	holeNumber: number;
	golferId: number;
	holeScore: number;
}

export type MatchTotalScore = {
	matchId: number;
	golferId: number;
	totalScore: number;
}
