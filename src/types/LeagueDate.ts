export type LeagueDate = {
	leagueId: string;
	id?: string;
	matchDate: Date;
	matchWeekNumber: number;
};

export type LeagueDates = {
	matchDates: LeagueDate[];
};
