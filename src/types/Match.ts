export type Match = {
	id?: string;
	leagueId: string;
	dateId: string;
	golfer1Id: string;
	golfer2Id: string;
};

export type Matches = {
  matches: Match[];
}
