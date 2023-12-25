export type Match = {
	id: number;
	leagueId: number;
	dateId: number;
	golfer1Id: string;
	golfer2Id: string;
};

export type Matches = {
  matches: Match[];
}
