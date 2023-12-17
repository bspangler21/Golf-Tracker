export type LeagueDate = {
	leagueId: number;
	id: number;
	matchDate: Date;
	matchWeekNumber: number;
};

export type LeagueDates = {
	matchDates: LeagueDate[];
};
