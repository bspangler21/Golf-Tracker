import { Match } from "../types/Match";
import { mockMatches } from "../mockData/mockMatches";

const matches = mockMatches;

export function getMatchesByDateId(id: number) {
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

export function getMatchesByPlayerId(id: number) {
	let matchListing: Match[] = [];
	console.log("matches id param = ", id);
	console.log("matches", matches);
	matchListing = matches.filter(
		(match) => match.golfer1Id === id || match.golfer2Id === id
	);

	return matchListing;
}
