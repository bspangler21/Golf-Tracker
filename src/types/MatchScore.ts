export type MatchScore = {
	leagueId: number;
	matchId: number;
	holeNumber: number;
	golferId: string;
	holeScore: number;
}

export type MatchTotalScore = {
	matchId: number;
	golferId: string;
	totalScore: number;
}
