// import { mergeStyleSets } from "@fluentui/react";
// import { useFetchData } from "../../hooks/GolferHooks";
import { DefaultButton, FontIcon, mergeStyles } from "@fluentui/react";
import { mockDates } from "../../mockData/mockDates";
import { useNavigate } from "react-router-dom";
import { useDeleteDate, useFetchDates } from "../../hooks/LeagueDateHooks";
import { LeagueDate } from "../../types/LeagueDate";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { Golfer } from "../../types/Golfer";
import { mockGolfers } from "../../mockData/mockGolfers";
import { getGolferById } from "../../util/golfers";
import { useState } from "react";
import { saveAs } from "file-saver";

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
let weeks: any[] = [];

const ScheduleList = () => {
	const nav = useNavigate();
	const { data: datesData } = useFetchDates();
	const { data: golfersData } = useFetchGolfers();
	const deleteDateMutation = useDeleteDate();
	golfers = golfersData ?? mockGolfers;
	dates = datesData ?? mockDates;
	let golfer1Index: number = 0;
	let golfer2Index: number = golfer1Index + 1;
	let randomNumber = Math.random();
	let weekNumber: number = 0;
	// console.log("randomNumber", randomNumber);
	// const [golfer1OpponentIndex, setGolfer1OpponentIndex] = useState<number>(
	// 	Math.floor(randomNumber * golfers.length)
	// );
	let golfer1OpponentIndex: number = Math.floor(
		randomNumber * golfers.length
	);
	let golfer2OpponentIndex: number = golfer1OpponentIndex + 1;
	// const [golfer2OpponentIndex, setGolfer2OpponentIndex] = useState<number>(
	// 	golfer1OpponentIndex + 1
	// );

	if (import.meta.env.DEV) {
		// console.log("dates", dates);
	}

	// dates.forEach((date) => {
	// 	console.log("dateId", date.id);
	// });

	// console.log("golfers", golfers);

	// for (let i = 0; i < dates.length; i++) {
	// 	console.log("dates[i].id", dates[i].id);

	// 	for (let j = 0; j < golfers.length; j++) {
	// 		console.log(
	// 			"golfers[j].id",
	// 			getGolferById(golfers[j]?.id ?? "", golfers)
	// 		);
	// 		console.log(
	// 			"golfer1",
	// 			getGolferById(golfers[0]?.id ?? "", golfers)
	// 		);
	// 		console.log("golfer1OpponentIndex", golfer1OpponentIndex);
	// 		console.log("golfer2OpponentIndex", golfer2OpponentIndex);
	// 		golfer1OpponentIndex++;
	// 		console.log("golfer1OpponentIndex", golfer1OpponentIndex);
	// 		console.log("golfer2OpponentIndex", golfer2OpponentIndex);
	// 	}
	// }

	interface Matchup {
		player1: Golfer;
		player2: Golfer;
	}

	const matchups: Matchup[] = [];
	let csvContent = "Week Number,Player 1,Player 2\n";
	let weeklyMatchups: any[] = [];
	let lastPlayer1: Golfer = {
		firstName: "",
		lastName: "",
		handicap: 0,
	};

	function findMostRecentWeekNumber(
		weeklyMatchups: any[],
		player1: any
	): number {
		let mostRecentWeekNumber = 0;

		for (let i = 0; i < weeklyMatchups.length; i++) {
			const matchup = weeklyMatchups[i].matchup;
			console.log("weeklyMatchups[i]", weeklyMatchups[i]);
			if (matchup.player2 === player1) {
				mostRecentWeekNumber = Math.max(
					mostRecentWeekNumber,
					weeklyMatchups[i].weekNumber
				);
			}
		}
		console.log("mostRecentWeekNumber", mostRecentWeekNumber);
		return mostRecentWeekNumber;
	}

	function matchExists(newMatchup, week) {
		// Check if the matchup or its reverse already exists in previous matchups
		return week.some(
			(matchup) =>
				(matchup[0] === newMatchup[0] &&
					matchup[1] === newMatchup[1]) ||
				(matchup[0] === newMatchup[1] && matchup[1] === newMatchup[0])
		);
	}

	// function splitMatchupsByWeek(matchups) {
	// 	const players = new Set();
	// 	const weeklyMatchups = {};

	// 	// Iterate over matchups
	// 	matchups.forEach(({ week, matchup }) => {
	// 		const [player1, player2] = matchup;

	// 		// Check if players have already played in the current week
	// 		if (!players.has(player1) && !players.has(player2)) {
	// 			// Mark players as played
	// 			players.add(player1);
	// 			players.add(player2);

	// 			// Add matchup to the current week
	// 			if (!weeklyMatchups[week]) {
	// 				weeklyMatchups[week] = [];
	// 			}
	// 			weeklyMatchups[week].push(matchup);
	// 		}

	// 		// If both players have played, reset the set for the next week
	// 		if (players.size === matchups.length) {
	// 			players.clear();
	// 		}
	// 	});

	// 	return weeklyMatchups;
	// }

	// wrap date around this somehow to generate matchups for each date

	function splitMatchupsByWeek(matchups) {
		// let weeklyMatchups: any[] = [];

		// let weekNumber = 1;
		for (let i = 0; i < matchups.length; i++) {
			if (!matchups[i - 1]) {
				weeklyMatchups.push({
					weekNumber: 1,
					// player1: matchups[i][0],
					// player2: matchups[i][1],
					matchup: { ...matchups[i] },
				});
			} else if (
				matchups[i].player1 === matchups[i - 1].player1

				// matchups[i].player2 === matchups[i - 1].player1 ||
				// matchups[i].player2 === matchups[i - 1].player2
			) {
				weekNumber++;
				weeklyMatchups.push({
					weekNumber: weekNumber,
					matchup: { ...matchups[i] },
				});
			} else {
				weekNumber = findMostRecentWeekNumber(
					weeklyMatchups,
					matchups[i].player1
					// matchups[i].player2
				);
				console.log(
					"most recent week number",
					matchups[i].player1.firstName + " " + weekNumber
				);
				weekNumber++;
				weeklyMatchups.push({
					weekNumber: weekNumber,
					matchup: { ...matchups[i] },
				});
			}
		}
		console.log(
			"weeklyMatchups",
			weeklyMatchups.sort((a, b) =>
				a.weekNumber > b.weekNumber ? 1 : -1
			)
		);
		return weeklyMatchups;
	}

	const generateMatchups = () => {
		for (let i = 0; i < golfers.length - 1; i++) {
			for (let j = i + 1; j < golfers.length; j++) {
				// Create a matchup
				const matchup = [golfers[i], golfers[j]];
				// splitMatchupsByWeek(matchup);
				// console.log("weeklyMatchup", splitMatchupsByWeek(matchup));
				// Check if the matchup or its reverse already exists in previous matchups
				if (!matchExists(matchup, matchups)) {
					// Add the matchup to the schedule
					// matchups.push(matchup);

					matchups.push({ player1: golfers[i], player2: golfers[j] });
				}
			}
		}

		return matchups;
	};

	// generateMatchups();
	// splitMatchupsByWeek(
	// 	// matchups.sort((a: any, b: any) =>
	// 	// 	a.player1.id > b.player1.id ? 1 : -1
	// 	// )
	// 	matchups
	// );
	console.log("matchups", matchups);

	const exportMatches = () => {
		generateMatchups();
		// splitMatchupsByWeek(
		// 	// matchups.sort((a: any, b: any) =>
		// 	// 	a.player1.id > b.player1.id ? 1 : -1
		// 	// )
		// 	matchups
		// );
		console.log("exportMatches", matchups);
		matchups.forEach((matchup) => {
			// console.log("matchup", matchup);
			// splitMatchupsByWeek(matchup);
			// csvContent += `${matchup[0].firstName} ${matchup[0].lastName},${matchup[1].firstName} ${matchup[1].lastName}\n`;
			// csvContent += `${matchup.player1.firstName} ${matchup.player1.lastName},${matchup.player2.firstName} ${matchup.player2.lastName}\n`;
			if (matchup.player1 !== lastPlayer1) {
				weekNumber++;
				weeklyMatchups.push({
					weekNumber: weekNumber,
					matchup: { ...matchup },
				});
			} else {
				weekNumber = findMostRecentWeekNumber(
					weeklyMatchups,
					matchup.player1
				);
				weekNumber++;
				weeklyMatchups.push({
					weekNumber: weekNumber,
					matchup: { ...matchup },
				});
			}
			lastPlayer1 = matchup.player1;
			csvContent += `${weekNumber},${matchup.player1.firstName} ${matchup.player1.lastName},${matchup.player2.firstName} ${matchup.player2.lastName}\n`;
		});
		console.log("weeklyMatchups", weeklyMatchups);
		// console.log("weeklyMatchups", splitMatchupsByWeek(matchups));

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

		saveAs(blob, `matches.csv`);
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
		</>
	);
};

export default ScheduleList;
