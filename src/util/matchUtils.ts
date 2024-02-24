import { Match } from "../types/Match";
// import { mockMatches } from "../mockData/mockMatches";
// import { mockDates } from "../mockData/mockDates";
import { LeagueDate } from "../types/LeagueDate";

// const matches = mockMatches;
// const dates = mockDates;

export function getMatchesByWeekNumber(
	weekNumber: number,
	leagueId: string,
	matches: Match[]
) {
	let matchListing: Match[] = [];

	matches.forEach((m) => {
		if (m.weekNumber === weekNumber && m.leagueId === leagueId) {
			matchListing.push(m);
		}
	});

	return matchListing;
}

export function getMatchesByPlayerId(id: string, matches: Match[]) {
	let matchListing: Match[] = [];
	console.log("matches id param = ", id);
	console.log("matches", matches);
	matchListing = matches.filter(
		(match) => match.golfer1Id === id || match.golfer2Id === id
	);

	return matchListing;
}

// get match date by date id
export function getMatchDateByDateId(id: string, dates: LeagueDate[]) {
	let matchDate = new Date();
	dates.forEach((d) => {
		if (d.id === id) {
			matchDate = d.matchDate;
		}
	});

	return matchDate;
}
