import { useEffect, useState } from "react";
import { getGolferById } from "../../util/golferUtils";
import { useParams } from "react-router-dom";
import { mockGolfers } from "../../mockData/mockGolfers";
import { mockHoles } from "../../mockData/mockHoles";
import { MatchScore } from "../../types/MatchScore";
import { DefaultButton } from "@fluentui/react";
import { mockCourses } from "../../mockData/mockCourses";
import { getMatchByMatchId, getMatchDateByDateId } from "../../util/matchUtils";
import { format, sub } from "date-fns";
import { useFetchGolfers } from "../../hooks/GolferHooks";
import { saveAs } from "file-saver";
import { Golfer } from "../../types/Golfer";
import { LeagueDate } from "../../types/LeagueDate";
import { mockMatches } from "../../mockData/mockMatches";
import { mockDates } from "../../mockData/mockDates";
import { Match } from "../../types/Match";

import { useFetchDates } from "../../hooks/LeagueDateHooks";
import { useFetchMatches } from "../../hooks/MatchHooks";
import { getLakeBreeze } from "../../util/courseUtils";
import { formatDate } from "../../util/generalUtils";

let LakeBreezeCourseId = "658cfca75669234ca16a65d8";

//only show holes and course for Lake Breeze
const golfHoles = mockHoles.filter(
	(hole) => hole.courseId === LakeBreezeCourseId
);

const course = getLakeBreeze(LakeBreezeCourseId, mockCourses);

let golfers: Golfer[] = [];
let matches: Match[] = [];
let dates: LeagueDate[] = [];
let currentMatchId = "1";

/**
 * Calculates the total yardage of the golf holes.
 *
 * @param {Array<{ holeLength?: number }>} golfHoles - The array of golf holes.
 * @returns {number} - The total yardage.
 */
let totalYardage = golfHoles.reduce(
	(sum, hole) => sum + (hole.holeLength ?? 0),
	0
);

let frontNinePar = golfHoles.reduce(
	(sum, hole) => sum + (hole.holePar ?? 0),
	0
);

type Args = {
	golfer1: any;
	golfer2: any;

	// isEdit: boolean;
	submitted: (matchScore: MatchScore) => void;
};
const Scorecard = ({
	golfer1,
	golfer2,

	// isEdit,
	submitted,
}: Args) => {
	const { data: matchesData } = useFetchMatches();
	const { data: dateData } = useFetchDates();
	const { data: golferData } = useFetchGolfers();

	const { golfer1Id, golfer2Id, matchId, dateId } = useParams();
	currentMatchId = matchId ?? "1";
	dates = dateData ?? mockDates;
	matches = matchesData ?? mockMatches;
	let currentMatchDate: Date =
		getMatchByMatchId(currentMatchId, matches)?.matchDate ?? new Date();
	// let matchScores: MatchScore[] = currentMatchScores ?? mockMatchScores;

	golfers = golferData ?? mockGolfers;
	// matches = matchesData ?? mockMatches;

	const player1 = getGolferById(golfer1Id ?? "", golfers);
	const player2 = getGolferById(golfer2Id ?? "", golfers);
	const matchDay = getMatchDateByDateId(dateId ?? "", dates);
	const [golfer1State, setGolfer1State] = useState({ ...golfer1 });
	const [golfer2State, setGolfer2State] = useState({ ...golfer2 });
	// golfer1Scores = golfer1State.holeScores;

	// golfer2Scores = golfer2State.holeScores;

	// let currentMatchScores: MatchScore[] = getMatchScoresByMatchId(
	// 	currentMatchId,
	// 	matchScores
	// );

	// currentMatchScores.length > 0 ? editMatch === true : editMatch === false;

	if (import.meta.env.DEV) {
		console.log("golfer1State", golfer1State);
		console.log("golfer2State", golfer2State);
		console.log("currentMatchId", currentMatchId);
		console.log("currentMatch", currentMatchDate);
	}

	let csvContent = "courseId,holeNumber,holeHandicap,holeLength,holePar\n";

	const exportCourseInfoToCSV = () => {
		// Convert golfers data to CSV format

		golfHoles.forEach((g) => {
			csvContent += `${g.courseId},${g.holeNumber},${g.holeHandicap},${g.holeLength},${g.holePar}\n`;
			console.log(csvContent);
		});

		// Create a Blob with the CSV content
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

		// Save the Blob as a CSV file
		saveAs(blob, `holes.csv`);
	};

	const getTotalScore = (holeScores: number[]) => {
		// console.log("holeScores typeof", typeof holeScores);
		return Object.values(holeScores).reduce((sum, score) => sum + score, 0);
	};

	const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();

		let player1Data: MatchScore = {
			id: golfer1State.id,
			golferId: player1.id || "",
			matchId: currentMatchId,
			totalScore: getTotalScore(golfer1State.holeScores),
			holeScores: golfer1State.holeScores,
		};
		let player2Data: MatchScore = {
			id: golfer2State.id,
			golferId: player2.id || "",
			matchId: currentMatchId,
			totalScore: getTotalScore(golfer2State.holeScores),
			holeScores: golfer2State.holeScores,
		};

		submitted(player1Data);
		submitted(player2Data);
	};

	return (
		<div style={{ width: "100%" }}>
			<table
			// className="responsive-table scorecard"
			>
				<caption></caption>
				<thead>
					<tr>
						<th scope="col"></th>
						<th data-title="1" scope="col">
							1
						</th>
						<th data-title="2" scope="col">
							2
						</th>
						<th data-title="3" scope="col">
							3
						</th>
						<th data-title="4" scope="col">
							4
						</th>
						<th data-title="5" scope="col">
							5
						</th>
						<th data-title="6" scope="col">
							6
						</th>
						<th data-title="7" scope="col">
							7
						</th>
						<th data-title="8" scope="col">
							8
						</th>
						<th data-title="9" scope="col">
							9
						</th>

						<th data-title="Out" scope="col">
							Out
						</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th data-type="player">Professional Tees</th>
						{golfHoles
							.filter((hole) => hole.holeNumber <= 9)
							.map((hole) => (
								<td key={hole.holeNumber}>{hole.holeLength}</td>
							))}
						<td>{totalYardage}</td>
					</tr>

					<tr>
						<th data-type="player">Handicap</th>
						{golfHoles
							.filter((hole) => hole.holeNumber <= 9)
							.map((hole) => (
								<td key={hole.holeNumber}>
									{hole.holeHandicap}
								</td>
							))}
						<td>&nbsp;</td>

						<td>&nbsp;</td>

						<td>&nbsp;</td>
					</tr>

					<tr>
						<th data-type="player">Par</th>

						{golfHoles
							.filter((hole) => hole.holeNumber <= 9)
							.map((hole) => (
								<td key={hole.holeNumber}>{hole.holePar}</td>
							))}
						{<td>{frontNinePar}</td>}
					</tr>

					<tr>
						<th>
							{player1.firstName} {player1.lastName}
						</th>

						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[0] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[0]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[1] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[1]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[2] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[2]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[3] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[3]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[4] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[4]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[5] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[5]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[6] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[6]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[7] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[7]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer1State.holeScores,
									];
									updatedHoleScores[8] = parseInt(
										e.target.value
									);
									setGolfer1State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer1State.holeScores[8]}
							></input>
						</td>
						<td>{getTotalScore(golfer1State.holeScores)}</td>
					</tr>
					<tr>
						<th>
							{player2.firstName} {player2.lastName}
						</th>

						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[0] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[0]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[1] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[1]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[2] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[2]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[3] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[3]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[4] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[4]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[5] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[5]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[6] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[6]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[7] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[7]}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => {
									const updatedHoleScores = [
										...golfer2State.holeScores,
									];
									updatedHoleScores[8] = parseInt(
										e.target.value
									);
									setGolfer2State((prevState) => ({
										...prevState,
										holeScores: updatedHoleScores,
									}));
								}}
								value={golfer2State.holeScores[8]}
							></input>
						</td>
						<td>{getTotalScore(golfer2State.holeScores)}</td>
					</tr>
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={9}>
							{course && (
								<strong>
									{course.name}, {course.city}, {course.state}
								</strong>
							)}{" "}
							— {formatDate(currentMatchDate)} — 76 with a slight
							wind
						</td>
					</tr>
				</tfoot>
			</table>
			<br></br>
			<div>
				<DefaultButton onClick={onSubmit}>Submit</DefaultButton>
			</div>
			<br></br>
			<div>
				<DefaultButton onClick={exportCourseInfoToCSV}>
					Export Golf Course Info
				</DefaultButton>
			</div>
		</div>
	);
};

export default Scorecard;
