import {useState } from "react";
import { getGolferById } from "../../util/golfers";
import { useParams } from "react-router-dom";
import { mockGolfers } from "../../mockData/mockGolfers";
import { mockHoles } from "../../mockData/mockHoles";
import { MatchScore } from "../../types/MatchScore";
// import { mockHoles } from "../../mockData/mockHoles";

const golfHoles = mockHoles;
const golfers = mockGolfers;

const Scorecard = () => {
	const { golfer1Id, golfer2Id } = useParams();
	console.log("golfer1", golfer1Id);
	const player1 = getGolferById(Number(golfer1Id));
	const player2 = getGolferById(Number(golfer2Id));
	const [frontNineScore, setFrontNineScore] = useState(0);
	const [backNineScore, setBackNineScore] = useState(0);
	let holeScore: number = 0;
	const [golferTotalScore, setGolferTotalScore] = useState(0);
	const [scores, setScores] = useState(
		mockGolfers.map(() => Array(golfHoles.length).fill(0))
	);
	const [roundScores, setRoundScores] = useState([]);
	let roundScoreArray: MatchScore[] = [];

	let golfer2Array: MatchScore[] = [];
	const [golfer1Score, setGolfer1Score] = useState(0);
	const [golfer2Score, setGolfer2Score] = useState(0);

	console.log("roundScores outside function", roundScores);
	console.log("golfer1Score", golfer1Score);
	console.log("golfer2Score", golfer2Score);

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		golferId: number,
		holeId: number
	) => {
		const newScore = parseInt(event.target.value);
		console.log("newScore", newScore);
		setGolferTotalScore(golferTotalScore + newScore);
		console.log("golferTotalScore", golferTotalScore);
		console.log("golferIndex", golferId);
		console.log("holeId", holeId);
		const updatedScores = [...scores]; // Create a copy of the current scores
		updatedScores[golferId][holeId] = newScore; // Update the score for the specific golfer and hole

		const totalScore = updatedScores[golferId].reduce(
			(total, score) => total + score
		); // Calculate total score

		const updatedGolfers = [...golfers];
		updatedGolfers[golferId].scores = updatedScores[golferId]; // Update the scores for the golfer
		updatedGolfers[golferId].totalScore = totalScore; // Update the total score for the golfer

		setScores(updatedScores); // Update the state with the new scores
		// Optionally, update the state with the new golfer data to maintain the total score

		console.log("Updated Scores:", updatedScores);
		console.log("Updated Golfers:", updatedGolfers);

		const newRoundScore = {
			matchId: 1,
			golferId: golferId,
			holeNumber: holeId,
			holeScore: newScore,
		};

		const [roundScores, setRoundScores] = useState<MatchScore[]>([]);

		golferId === 1 ? setGolfer1Score(golfer1Score + newScore) : "";
		golferId === 2 ? setGolfer2Score(golfer2Score + newScore) : "";
	};

	// Make golferIndex an array?
	const handleSubmitTotal = (
		golfer1Index: number,
		matchId: number,
		golfer1TotalScore: number,
		golfer2Index: number,
		golfer2TotalScore: number
	) => {
		let winningMessage =
			golfer1TotalScore > golfer2TotalScore
				? `${getGolferById(golfer2Index).firstName} wins!`
				: `${getGolferById(golfer1Index).firstName} wins!`;
		alert(
			`${
				getGolferById(golfer1Index).firstName
			}'s total score is ${golfer1TotalScore}. ${
				getGolferById(golfer2Index).firstName
			}'s total score is ${golfer2TotalScore}. ${winningMessage}`
		);
	};

	const handleSubmitPerHole = (
		event: React.ChangeEvent<HTMLButtonElement>,
		golferIndex: number,
		matchId: number,
		totalScore: number
	) => {};

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
					<tr >
						<th
							data-type="player"
							
						>
							Professional Tees
						</th>
						<td>390</td>
						<td>143</td>
						<td>535</td>
						<td>405</td>
						<td>483</td>
						<td>463</td>
						<td>503</td>
						<td>223</td>
						<td>448</td>
						<td>3593</td>
					</tr>

					<tr>
						<th
							data-type="player"
							
						>
							Handicap
						</th>
						<td>15</td>
						<td>17</td>
						<td>7</td>
						<td>5</td>
						<td>3</td>
						<td>1</td>
						<td>11</td>
						<td>13</td>
						<td>9</td>
						<td>&nbsp;</td>

						<td>&nbsp;</td>

						<td>&nbsp;</td>
					</tr>

					<tr>
						<th
							data-type="player"
							
						>
							Par
						</th>
						<td>4</td>
						<td>3</td>
						<td>5</td>
						<td>4</td>
						<td>4</td>
						<td>4</td>
						<td>5</td>
						<td>3</td>
						<td>4</td>
						<td>36</td>
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
						<td className={scoreCardStyles.totalColumn}>
							{golfer1Score}
						</td>
					</tr>
					<tr className={scoreCardStyles.playerInfo}>
						<th className={scoreCardStyles.playerName}>
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
						<td className={scoreCardStyles.totalColumn}>
							{golfer2Score}
						</td>
					</tr>
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={9}>
							<strong>Augusta National, Augusta Georgia </strong>—
							March 31, 2014 — 76 with a slight wind
						</td>
					</tr>
				</tfoot>
			</table>
			<div>
				<button
					onClick={() =>
						handleSubmitTotal(
							player1.id,
							1,
							golfer1Score,
							player2.id,
							golfer2Score
						)
					}
				>
					Submit
				</button>
			</div>
		</>
	);
};

export default Scorecard;
