export type Match = {
	id?: string;
	leagueId: string;
	dateId: string;
	// Need to be null because either may be on a bye
	golfer1Id?: string;
	golfer2Id?: string;
};

export type Matches = {
  matches: Match[];
}
