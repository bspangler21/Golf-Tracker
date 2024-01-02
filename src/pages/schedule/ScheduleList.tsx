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
import { fi } from "date-fns/locale";

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
	let finalMatchups: any[] = [];
	let finalMatchupsExport: any[] = [];

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

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function generateMatchSchedule(golfers: Golfer[]) {
		if (golfers.length % 2 !== 0) {
			golfers.push({ firstName: "Bye", lastName: "", handicap: 0 });
		}
		const shuffledGolfers = shuffleArray(golfers);
		const matchSchedule: any = [];

		for (let i = 0; i < shuffledGolfers.length - 1; i++) {
			const roundMatches: any = [];
			let match: any = { golfer1: {}, golfer2: {}, weekNumber: 0 };
			for (let j = 0; j < shuffledGolfers.length / 2; j++) {
				match = {
					homeTeam: shuffledGolfers[j],
					awayTeam: shuffledGolfers[shuffledGolfers.length - 1 - j],

					weekNumber: `Date ${i + 1}`,
				};
				roundMatches.push(match);
			}
			matchSchedule.push(roundMatches);

			// Rotate the teams array for the next round
			shuffledGolfers.splice(1, 0, shuffledGolfers.pop());
		}
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
