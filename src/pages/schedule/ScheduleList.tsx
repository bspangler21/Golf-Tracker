// import { mergeStyleSets } from "@fluentui/react";
// import { useFetchData } from "../../hooks/GolferHooks";
import {
	Checkbox,
	DefaultButton,
	FontIcon,
	mergeStyles,
} from "@fluentui/react";
import { mockDates } from "../../mockData/mockDates";
import { useNavigate } from "react-router-dom";
import {
	useAddDate,
	useDeleteDate,
	useFetchDates,
} from "../../hooks/LeagueDateHooks";
import { LeagueDate } from "../../types/LeagueDate";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { Golfer } from "../../types/Golfer";
import { mockGolfers } from "../../mockData/mockGolfers";
import { saveAs } from "file-saver";
import axios from "axios";

import {
	useAddMatch,
	useFetchMatches,
	useDeleteMatch,
} from "../../hooks/MatchHooks";
import { mockMatches } from "../../mockData/mockMatches";
import Bottleneck from "bottleneck";
import { getGolferById } from "../../util/golferUtils";
import { useState } from "react";

import { Match } from "../../types/Match";
import MatchesDetail from "../../pageComponents/MatchesDetail";

const iconClass = mergeStyles({
	fontSize: 25,
	height: 25,
	width: 25,
	margin: "0 5px",
});

let matches: Match[] = [];
let golfers: Golfer[] = [];
// let weeks: any[] = [];
const wpsLeagueId = "658cf9da5669234ca16a65c8";
const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

const ScheduleList = () => {
	const nav = useNavigate();
	const { data: matchesData } = useFetchMatches();
	const { data: golfersData } = useFetchGolfers();
	const addMatch = useAddMatch();
	const deleteMatch = useDeleteMatch();
	const [showOverview, setShowOverview] = useState(true);
	const [showMatches, setShowMatches] = useState(false);
	golfers = golfersData ?? mockGolfers;
	matches = matchesData ?? mockMatches;
	// filter matches for unique matchDates
	const uniqueMatchDates = matches.filter((date, index) => {
		return (
			matches.findIndex((d) => d.matchDate === date.matchDate) === index
		);
	});

	let finalMatchups: any[] = [];

	// const matchups: Matchup[] = [];
	let csvContent = "Week Number,Player 1,Player 2\n";

	/**
	 * Shuffles the elements in an array using the Fisher-Yates algorithm.
	 * @param {Array} array - The array to be shuffled.
	 * @returns {Array} - The shuffled array.
	 */

	/* The Fisher-Yates algorithm, also known as the Knuth shuffle, is an algorithm used to randomly shuffle the elements of an array. It ensures that every possible permutation of the elements is equally likely.

	* The algorithm works by iterating over the array from the last element to the first. In each iteration, it selects a random index from the remaining unshuffled elements and swaps the element at that index with the current element. This process continues until all elements have been shuffled.

	* Here's a step-by-step breakdown of the Fisher-Yates algorithm:

		1. Start with an array of elements.
		2. Iterate over the array from the last element to the first.
		3. In each iteration, generate a random index between 0 and the current iteration index (inclusive).
		4. Swap the element at the random index with the element at the current iteration index.
		5. Repeat steps 3 and 4 for each iteration until the first element is reached.
		6. The array is now shuffled.
	
	* By using this algorithm, you can achieve a truly random and unbiased shuffling of the elements in an array. It is commonly used in various applications, including card games, randomizing quiz questions, and generating random permutations.
	*
	*/

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			/**
			 * Generates a random number between 0 and the specified maximum value (inclusive).
			 * @param {number} max - The maximum value for the random number.
			 * @returns {number} - The generated random number.
			 */
			const j = Math.floor(Math.random() * (i + 1));
			/**
			 * Swaps the elements at the given indices in the array.
			 *
			 * @param array - The array in which the elements should be swapped.
			 * @param i - The index of the first element to be swapped.
			 * @param j - The index of the second element to be swapped.
			 */
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function generateMatchSchedule(golfers: Golfer[]) {
		/**
		 * If the number of golfers is odd, adds a "Bye" golfer to the list.
		 * @param {Array<{ firstName: string, lastName: string, handicap: number }>} golfers - The list of golfers.
		 */
		if (golfers.length % 2 !== 0) {
			golfers.push({
				firstName: "Bye",
				lastName: "Week",
				handicap: 0,
			});
		}
		/**
		 * Shuffles an array using the Fisher-Yates algorithm.
		 * @param array - The array to be shuffled.
		 * @returns The shuffled array.
		 */
		const shuffledGolfers = shuffleArray(golfers);
		const matchSchedule: Match[][] = [];

		let dateValues: any = [];
		let startDate: Date = new Date("5/07/2024");
		let dateObject: LeagueDate = {
			leagueId: wpsLeagueId,
			matchDate: startDate,
			matchWeekNumber: 0,
		};
		let createdDateId: any = "";
		let matchObject: Match = {
			leagueId: wpsLeagueId,
			weekNumber: 0,
			matchDate: new Date("5/07/2024"),
			golfer1Id: "",
			golfer2Id: "",
		};

		/**
		 * Generates a schedule list based on the shuffledGolfers array.
		 * Each round consists of matches between pairs of golfers.
		 * The schedule is generated by rotating the teams array for each round.
		 * @param shuffledGolfers - An array of shuffled golfers.
		 * @returns An array of round matches, each containing the home team, away team, and week number.
		 */
		for (let i = 0; i < shuffledGolfers.length - 1; i++) {
			const roundMatches: Match[] = [];
			// let match: any = { golfer1: {}, golfer2: {}, weekNumber: 0 };

			for (let j = 0; j < shuffledGolfers.length / 2; j++) {
				matchObject = {
					golfer1Id: shuffledGolfers[j].id,
					golfer2Id:
						shuffledGolfers[shuffledGolfers.length - 1 - j].id,
					weekNumber: parseInt(`${i + 1}`),
					leagueId: wpsLeagueId,
					matchDate: startDate,
				};
				// addMatch.mutate(matchObject);
				roundMatches.push(matchObject);
			}
			matchSchedule.push(roundMatches);

			// roundMatches.forEach((match) => {
			// 	matchObject = {
			// 		leagueId: wpsLeagueId,
			// 		weekNumber: match.weekNumber,
			// 		matchDate: startDate,
			// 		golfer1Id: match.homeTeam.id,
			// 		golfer2Id: match.awayTeam.id,
			// 	};
			// 	axios.post(`${apiURL}/api/Matches`, matchObject);
			// });

			// Rotate the teams array for the next round
			shuffledGolfers.splice(1, 0, shuffledGolfers.pop());
			startDate = new Date(startDate.setDate(startDate.getDate() + 7));
		}
		// Get unique values from dateValues array
		// let uniqueDateValues: number[] = dateValues.filter(
		// 	(value, index, self) => self.indexOf(value) === index
		// );

		console.log("matchSchedule", matchSchedule);
		return matchSchedule;
	}

	const exportMatches = () => {
		finalMatchups = generateMatchSchedule(golfers);
		console.log("finalMatchups", finalMatchups.length);

		/*finalMatchups.forEach((matchup) => {
			matchup.forEach((match) => {
				let addedMatchObject: Match = {
					leagueId: wpsLeagueId,
					weekNumber: match.weekNumber,
					matchDate: match.matchDate,
					golfer1Id: match.golfer1Id,
					golfer2Id: match.golfer2Id,
				};
				console.log("addedMatchObject", addedMatchObject);
				// const limiter = new Bottleneck({ minTime: 100 });
				// limiter
				// 	.schedule(async () =>
				// 		// axios.post(`${apiURL}/api/Matches`, addedMatchObject)
				// 		addMatch.mutate(addedMatchObject)
				// 	)
				// 	.then((res) => {
				// 		console.log("res", res);
				// 	})
				// 	.catch((err) => {
				// 		console.log("err", err);
				// 	});
				addMatch.mutate(addedMatchObject);
			});
		});*/

		finalMatchups.map((matchup) => {
			matchup.map((match) => {
				csvContent += `${match.weekNumber},${
					getGolferById(match.golfer1Id, golfers).firstName ?? ""
				}${" "}${
					getGolferById(match.golfer1Id, golfers).lastName ?? ""
				},${getGolferById(match.golfer2Id, golfers).firstName ?? ""}${
					getGolferById(match.golfer2Id, golfers).lastName ?? ""
				}\n`;
			});
		});

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

		saveAs(blob, `matches.csv`);
		console.log("final matchups length", finalMatchups.length);
		setShowMatches(true);
		setShowOverview(false);
		// window.location.reload();
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				{
					<table>
						<thead>
							<tr>
								<th>Week Number</th>
								<th>Date</th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{uniqueMatchDates &&
								uniqueMatchDates
									.sort((a, b) =>
										a.matchDate > b.matchDate ? 1 : -1
									)
									// .reverse()
									.map((match) => (
										<tr key={match.id}>
											<td
												onClick={() =>
													nav(
														`/matches/${match.weekNumber}`
													)
												}
											>
												{match.weekNumber}
											</td>
											<td
												onClick={() =>
													nav(
														`/matches/${match.weekNumber}`
													)
												}
											>
												{new Date(
													match.matchDate
												).toLocaleDateString()}
											</td>
											<td
												onClick={() =>
													nav(
														`/schedule-list/edit/${match.id}`
													)
												}
											>
												<FontIcon
													aria-label="Edit"
													iconName="Edit"
													className={iconClass}
												/>
											</td>
										</tr>
									))}
						</tbody>
					</table>
				}
				{showMatches && <MatchesDetail matchups={finalMatchups} />}
			</div>
			<br></br>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<DefaultButton onClick={exportMatches}>Export</DefaultButton>
			</div>
			<div>
				<DefaultButton
					onClick={() => {
						matches.forEach((match) => {
							deleteMatch.mutate(match);
						});
						window.location.reload();
					}}
				>
					Delete All Matches
				</DefaultButton>
			</div>
		</>
	);
};

export default ScheduleList;
