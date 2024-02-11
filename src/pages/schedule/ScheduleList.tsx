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
import { Match } from "../../types/Match";
import { getLeagueDateIdByWeekNumber } from "../../util/leagueDateUtils";

const iconClass = mergeStyles({
	fontSize: 25,
	height: 25,
	width: 25,
	margin: "0 5px",
});

// const classNames = mergeStyleSets({
// 	tableTextColor: {
// 		color: "#000000",
// 		width: "100vh",
// 		height: "100vh",
// 	},
// 	tableHeader: {
// 		width: "50%",
// 		border: "2px #000000",
// 		verticalAlign: "middle",
// 		// display: "flex",
// 		// flexDirection: "row",

// 		flexGrow: "1",
// 	},
// 	tableRow: {
// 		// display: "flex",
// 		flexDirection: "column",
// 		borderBottom: "1px #000000",
// 		verticalAlign: "middle",
// 	},
// });
let dates: LeagueDate[] = [];
let golfers: Golfer[] = [];
// let weeks: any[] = [];
const wpsLeagueId = "658cf9da5669234ca16a65c8";
const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

const ScheduleList = () => {
	const nav = useNavigate();
	const { data: datesData } = useFetchDates();
	const { data: golfersData } = useFetchGolfers();
	const deleteDateMutation = useDeleteDate();
	const addDateMutation = useAddDate();
	golfers = golfersData ?? mockGolfers;
	dates = datesData ?? mockDates;
	// let golfer1Index: number = 0;
	// let golfer2Index: number = golfer1Index + 1;
	// let randomNumber = Math.random();
	// let weekNumber: number = 0;
	// console.log("randomNumber", randomNumber);
	// const [golfer1OpponentIndex, setGolfer1OpponentIndex] = useState<number>(
	// 	Math.floor(randomNumber * golfers.length)
	// );
	// let golfer1OpponentIndex: number = Math.floor(
	// 	randomNumber * golfers.length
	// );
	// let golfer2OpponentIndex: number = golfer1OpponentIndex + 1;
	let finalMatchups: any[] = [];
	// let finalMatchupsExport: any[] = [];

	// interface Matchup {
	// 	player1: Golfer;
	// 	player2: Golfer;
	// }

	// const matchups: Matchup[] = [];
	let csvContent = "Week Number,Player 1,Player 2\n";
	let datesToDelete: LeagueDate[] = [];
	// let weeklyMatchups: any[] = [];
	// let lastPlayer1: Golfer = {
	// 	firstName: "",
	// 	lastName: "",
	// 	handicap: 0,
	// };

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
			golfers.push({ firstName: "Bye", lastName: "", handicap: 0 });
		}
		/**
		 * Shuffles an array using the Fisher-Yates algorithm.
		 * @param array - The array to be shuffled.
		 * @returns The shuffled array.
		 */
		const shuffledGolfers = shuffleArray(golfers);
		const matchSchedule: any = [];

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
			const roundMatches: any = [];
			let match: any = { golfer1: {}, golfer2: {}, weekNumber: 0 };

			for (let j = 0; j < shuffledGolfers.length / 2; j++) {
				match = {
					homeTeam: shuffledGolfers[j],
					awayTeam: shuffledGolfers[shuffledGolfers.length - 1 - j],

					weekNumber: `${i + 1}`,
				};
				dateValues.push(match.weekNumber);
				roundMatches.push(match);
			}
			matchSchedule.push(roundMatches);

			// Rotate the teams array for the next round
			shuffledGolfers.splice(1, 0, shuffledGolfers.pop());
		}
		// Get unique values from dateValues array
		let uniqueDateValues: number[] = dateValues.filter(
			(value, index, self) => self.indexOf(value) === index
		);



		

		

		// dateValues.forEach(async (dateValue) => {
		// 	matchSchedule.forEach(async (matchup) => {
		// 		for (const match of matchup) {
		// 			matchObject = {
		// 				leagueId: wpsLeagueId,
		// 				dateId: await getLeagueDateIdByWeekNumber(dateValue),
		// 				golfer1Id: match.homeTeam.id,
		// 				golfer2Id: match.awayTeam.id,
		// 			};
		// 			await axios.post(`${apiURL}/api/Matches`, matchObject);
		// 		}
		// 	});
		// });

		console.log("dateValues", dateValues);
		console.log("matchSchedule", matchSchedule);
		return matchSchedule;
	}

	const exportMatches = () => {
		finalMatchups = generateMatchSchedule(golfers);
		// finalMatchups.forEach((matchup) => {
		// 	console.log("matchup", matchup);
		// 	csvContent += `${matchup.weekNumber},${matchup.homeTeam?.firstName ?? ""} ${matchup.homeTeam?.lastName ?? ""},${matchup.awayTeam?.firstName ?? ""} ${matchup.awayTeam?.lastName ?? ""}\n`;
		// });
		finalMatchups.map((matchup) => {
			matchup.map((match) => {
				csvContent += `${match.weekNumber},${
					match.homeTeam?.firstName ?? ""
				} ${match.homeTeam?.lastName ?? ""},${
					match.awayTeam?.firstName ?? ""
				} ${match.awayTeam?.lastName ?? ""}\n`;
			});
		});
		// generateMatchups();
		// splitMatchupsByWeek(
		// 	// matchups.sort((a: any, b: any) =>
		// 	// 	a.player1.id > b.player1.id ? 1 : -1
		// 	// )
		// 	matchups
		// );

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

		// saveAs(blob, `matches.csv`);
	};

	const handleCheckboxChange = (event: any, leagueDate: LeagueDate) => {
		if (event.target.checked) {
			datesToDelete.push(leagueDate);
		}
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
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
						{dates &&
							dates
								.sort((a, b) =>
									a.matchDate > b.matchDate ? 1 : -1
								)
								// .reverse()
								.map((date) => (
									<tr key={date.id}>
										<td
											onClick={() =>
												nav(`/matches/${date.id}`)
											}
										>
											{date.matchWeekNumber}
										</td>
										<td
											onClick={() =>
												nav(`/matches/${date.id}`)
											}
										>
											{new Date(
												date.matchDate
											).toLocaleDateString()}
										</td>
										<td
											onClick={() =>
												nav(
													`/schedule-list/edit/${date.id}`
												)
											}
										>
											<FontIcon
												aria-label="Edit"
												iconName="Edit"
												className={iconClass}
											/>
										</td>
										<td
											onClick={() => {
												if (
													window.confirm(
														"Are you sure you want to delete this date?"
													)
												) {
													deleteDateMutation.mutate(
														date
													);
												}
											}}
										>
											<FontIcon
												aria-label="Delete"
												iconName="Delete"
												className={iconClass}
											/>
										</td>
										<td>
											<Checkbox
												defaultChecked={false}
												onChange={(event) =>
													handleCheckboxChange(
														event,
														date
													)
												}
											/>
										</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
			<br></br>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<DefaultButton onClick={() => nav(`/add-date`)}>
					Add Date
				</DefaultButton>
			</div>
			<div>
				<button onClick={exportMatches}>Export</button>
			</div>
			<div>
				<button
					onClick={() => {
						if (
							window.confirm(
								"Are you sure you want to delete all dates?"
							)
						) {
							datesData?.forEach((date) => {
								deleteDateMutation.mutate(date);
							});
							// 	if (datesToDelete.length > 0) {
							// 		datesToDelete.forEach((date) => {
							// 			deleteDateMutation.mutate(date);
							// 		});
							// 	}
							// }
						}
					}}
				>
					Delete All Selected
				</button>
			</div>
		</>
	);
};

export default ScheduleList;
