// import { Label, TextField } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { mockHoles } from "../../mockData/mockHoles";
import { mockGolfers } from "../../mockData/mockGolfers";
import { TextField } from "@fluentui/react";

const golfHoles = mockHoles;
const golfers = mockGolfers;

// interface Hole {
// 	holeNumber: number;
// 	par: number;
// }

// interface Player {
// 	name: string;
// 	scores: number[];
// }

// interface ScorecardProps {
// 	courseName: string;
// 	holes: Hole[];
// 	players: Player[];
// }

const Scorecard2 = ({ courseName }) => {
	const [frontNineScore, setFrontNineScore] = useState(0);
	// const [backNineScore, setBackNineScore] = useState(0);
	let holeScore: number = 0;
	// const [scores, setScores] = useState(
	// 	mockGolfers.map(() => Array(golfHoles.length).fill(0))
	// );

	function handleOnChange(
		_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		newValue?: string | undefined
		// index?: number,
		// holeIndex?: number
	): void {
		if (newValue) {
			holeScore = parseInt(newValue);
			setFrontNineScore(frontNineScore + holeScore);
			console.log("frontNineScore", frontNineScore);
			console.log("holeScore", holeScore);
		}
	}

	return (
		<div>
			<h1>{courseName}</h1>
			<table>
				<thead>
					<tr>
						<th>Hole</th>
						{golfHoles.map((hole) => (
							<th key={hole.holeNumber}>H{hole.holeNumber}</th>
						))}
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{golfers.map((player, index) => (
						<tr key={player.id}>
							<td>
								{player.firstName}
								{player.lastName}
							</td>
							{player.scores &&
								player.scores.map((scores, holeIndex) => (
									<td key={holeIndex}>
										<TextField
											value={scores[index][holeIndex]}
											onChange={handleOnChange}
										></TextField>
									</td>
								))}
						</tr>
					))}
				</tbody>
			</table>
			{/* Calculate and display totals */}
		</div>
	);
};

export default Scorecard2;
