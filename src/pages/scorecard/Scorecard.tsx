import { useState } from "react";
import { getGolferById } from "../../util/golfers";
import { useParams } from "react-router-dom";
import { mockGolfers } from "../../mockData/mockGolfers";
import { mockHoles } from "../../mockData/mockHoles";
import { MatchScore } from "../../types/MatchScore";
import { DefaultButton } from "@fluentui/react";
import { mockCourses } from "../../mockData/mockCourses";
import { getMatchDateById } from "../../util/matches";
import { format } from "date-fns";
import { useFetchGolfers } from "../../hooks/GolferHooks";
// import { mockHoles } from "../../mockData/mockHoles";

const golfHoles = mockHoles.filter(
	(hole) => hole.courseId === "658cfca75669234ca16a65d8"
);

// const golfers = mockGolfers;
const course = mockCourses.find(
	(course) => course.id === "658cfca75669234ca16a65d8"
);

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

const Scorecard = () => {
	const { data } = useFetchGolfers();
	const { golfer1Id, golfer2Id, dateId } = useParams();

	const player1 = getGolferById(golfer1Id ?? "", data ?? mockGolfers);
	const player2 = getGolferById(golfer2Id ?? "", data ?? mockGolfers);
	const matchDay = getMatchDateById(dateId ?? "");

	// const [frontNineScore, setFrontNineScore] = useState(0);
	// const [backNineScore, setBackNineScore] = useState(0);
	// let holeScore: number = 0;
	const [golferTotalScore, setGolferTotalScore] = useState(0);
	const [scores, setScores] = useState(
		data?.map(() => Array(golfHoles.length).fill(0))
	);
	const [roundScores, setRoundScores] = useState<MatchScore[]>([]);
	// const [roundScores, setRoundScores] = useState([]);
	// let roundScoreArray: MatchScore[] = [];

	// let golfer2Array: MatchScore[] = [];
	const [golfer1Score, setGolfer1Score] = useState(0);
	const [golfer2Score, setGolfer2Score] = useState(0);

	if (import.meta.env.DEV) {
		console.log("golfer1", golfer1Id);
		console.log("golfer2", golfer2Id);
		console.log("matchDay", matchDay);
		console.log("dateId", dateId);
		console.log("roundScores outside function", roundScores);
		console.log("golfer1Score", golfer1Score);
		console.log("golfer2Score", golfer2Score);
	}

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		golferId: number,
		holeId: number
	) => {
		const newScore = parseInt(event.target.value);

		setGolferTotalScore(golferTotalScore + newScore);

		const updatedScores = [...(scores ?? [])];
		updatedScores[golferId][holeId] = newScore; // Update the score for the specific golfer and hole

		const totalScore = updatedScores[golferId].reduce(
			(total, score) => total + score
		); // Calculate total score

		const updatedGolfers = [...(data ?? [])];
		updatedGolfers[golferId].scores = updatedScores[golferId]; // Update the scores for the golfer
		updatedGolfers[golferId].totalScore = totalScore; // Update the total score for the golfer

		setScores(updatedScores); // Update the state with the new scores
		// Optionally, update the state with the new golfer data to maintain the total score

		if (import.meta.env.DEV) {
			console.log("newScore", newScore);
			console.log("golferTotalScore", golferTotalScore);
			console.log("golferIndex", golferId);
			console.log("holeId", holeId);
			console.log("Updated Scores:", updatedScores);
			console.log("Updated Golfers:", updatedGolfers);
		}

		const newRoundScore: MatchScore = {
			leagueId: 1,
			matchId: 1,
			golferId: golferId.toString(),
			holeNumber: holeId,
			holeScore: newScore,
		};

		setRoundScores((prevRoundScores) => [
			...prevRoundScores,
			newRoundScore,
		]);

		golferId === 1 ? setGolfer1Score(golfer1Score + newScore) : "";
		golferId === 2 ? setGolfer2Score(golfer2Score + newScore) : "";
	};

	// Make golferIndex an array?
	const handleSubmitTotal = (
		golfer1Index: string,
		_matchId: number,
		golfer1TotalScore: number,
		golfer2Index: string,
		golfer2TotalScore: number
	) => {
		let winningMessage =
			golfer1TotalScore > golfer2TotalScore
				? `${
						getGolferById(golfer2Index.toString(), data ?? [])
							.firstName
				  } wins!`
				: `${
						getGolferById(golfer1Index.toString(), data ?? [])
							.firstName
				  } wins!`;
		alert(
			`${
				getGolferById(golfer1Index.toString(), data ?? []).firstName
			}'s total score is ${golfer1TotalScore}. ${
				getGolferById(golfer2Index.toString(), data ?? []).firstName
			}'s total score is ${golfer2TotalScore}. ${winningMessage}`
		);
	};

	// const handleSubmitPerHole = (
	// 	event: React.ChangeEvent<HTMLButtonElement>,
	// 	golferIndex: number,
	// 	matchId: number,
	// 	totalScore: number
	// ) => {};

	return (
		<>
			<table className="responsive-table scorecard">
				<caption></caption>
				<thead>
					<tr className="hole-number">
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
					</tr>

					<tr>
						<th>
							{player1.firstName} {player1.lastName}
						</th>

						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 1)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 2)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 3)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 4)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 5)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 6)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 7)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 8)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 1, 9)}
							></input>
						</td>
						<td>{golfer1Score}</td>
					</tr>
					<tr>
						<th>
							{player2.firstName} {player2.lastName}
						</th>

						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 1)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 2)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 3)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 4)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 5)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 6)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 7)}
							></input>
						</td>
						<td>
							<input
								title="Enter value"
								onChange={(e) => handleOnChange(e, 2, 8)}
							></input>
						</td>
						<td>
							<input
								onChange={(e) => handleOnChange(e, 2, 9)}
							></input>
						</td>
						<td>{golfer2Score}</td>
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
							— {format(matchDay, "MMMM do, yyyy")} — 76 with a
							slight wind
						</td>
					</tr>
				</tfoot>
			</table>
			<br></br>
			<div>
				<DefaultButton
					onClick={() =>
						handleSubmitTotal(
							player1.id || "",
							1,
							golfer1Score,
							player2.id || "",
							golfer2Score
						)
					}
				>
					Submit
				</DefaultButton>
			</div>
		</>
	);
};

export default Scorecard;
