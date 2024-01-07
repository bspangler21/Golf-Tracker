export type MatchScore = {
	// leagueId: number;
	id?: string;
	matchId: string;
	// holeNumber: number;
	golferId: string;
	totalScore: number;
	holeScores: string;
};

export type MatchTotalScore = {
	matchId: string;
	golferId: string;
	totalScore: number;
};
