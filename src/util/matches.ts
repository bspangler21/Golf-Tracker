import { Match } from "../types/Match";
// import { mockMatches } from "../mockData/mockMatches";
// import { mockDates } from "../mockData/mockDates";
import { LeagueDate } from "../types/LeagueDate";

// const matches = mockMatches;
// const dates = mockDates;

export function getMatchesByDateId(id: string, matches: Match[]) {
	let matchListing: Match[] = [];
	console.log("param", id);

	matches.forEach((m) => {
		console.log("m.dateId", m.dateId);
		if (m.dateId === id) {
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
export function getMatchDateById(id: string, dates: LeagueDate[]) {
	let matchDate = new Date();
	dates.forEach((d) => {
		if (d.id === id) {
			matchDate = d.matchDate;
		}
	});

	return matchDate;
}

// export function getMatchesByDateId(id: string) {
// 	let matchListing: Match[] = [];
// 	console.log("param", id);

// 	matches.forEach((m) => {
// 		console.log("m.dateId", m.dateId);
// 		if (m.dateId === id) {
// 			matchListing.push(m);
// 		}
// 	});

// 	return matchListing;
// }

// export function getMatchesByPlayerId(id: string) {
// 	let matchListing: Match[] = [];
// 	console.log("matches id param = ", id);
// 	console.log("matches", matches);
// 	matchListing = matches.filter(
// 		(match) => match.golfer1Id === id || match.golfer2Id === id
// 	);

// 	return matchListing;
// }

// // get match date by date id
// export function getMatchDateById(id: string) {
// 	let matchDate = new Date();
// 	dates.forEach((d) => {
// 		if (d.id === id) {
// 			matchDate = d.matchDate;
// 		}
// 	});

// 	return matchDate;
// }
