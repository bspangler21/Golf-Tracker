import { Label, TextField } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { mockHoles } from "../../mockData/mockHoles";

const golfHoles = mockHoles;

const Scorecard = () => {
	const [frontNineScore, setFrontNineScore] = useState(0);
	const [backNineScore, setBackNineScore] = useState(0);
	let holeScore: number = 0;

	console.log("frontNineScore", frontNineScore);

	function handleOnChange(
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		newValue?: string | undefined
	): void {
		if (newValue) {
			holeScore = parseInt(newValue);
			setFrontNineScore(frontNineScore + holeScore);
		}
	}

	return (
		<>
			<table className="responsive-table scorecard">
				<caption>Joe Smith</caption>
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

						<th data-title="10" scope="col">
							10
						</th>
						<th data-title="11" scope="col">
							11
						</th>
						<th data-title="12" scope="col">
							12
						</th>
						<th data-title="13" scope="col">
							13
						</th>
						<th data-title="14" scope="col">
							14
						</th>
						<th data-title="15" scope="col">
							15
						</th>
						<th data-title="16" scope="col">
							16
						</th>
						<th data-title="17" scope="col">
							17
						</th>
						<th data-title="18" scope="col">
							18
						</th>

						<th data-title="In" scope="col">
							In
						</th>

						<th data-title="Total" scope="col">
							Total
						</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th data-type="player">Professional Tees</th>
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

						<td>346</td>
						<td>169</td>
						<td>525</td>
						<td>429</td>
						<td>193</td>
						<td>447</td>
						<td>407</td>
						<td>485</td>
						<td>442</td>
						<td>3443</td>

						<td>7036</td>
					</tr>

					<tr>
						<th data-type="player">Handicap</th>
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

						<td>16</td>
						<td>14</td>
						<td>8</td>
						<td>6</td>
						<td>18</td>
						<td>2</td>
						<td>4</td>
						<td>10</td>
						<td>12</td>
						<td>&nbsp;</td>

						<td>&nbsp;</td>
					</tr>

					<tr>
						<th data-type="player">Par</th>
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

						<td>4</td>
						<td>3</td>
						<td>5</td>
						<td>4</td>
						<td>3</td>
						<td>4</td>
						<td>4</td>
						<td>5</td>
						<td>4</td>
						<td>36</td>

						<td>72</td>
					</tr>

					<tr>
						<th data-type="player">Score</th>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>
							<TextField onChange={handleOnChange}></TextField>
						</td>
						<td>{frontNineScore}</td>

						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>
							<TextField></TextField>
						</td>
						<td>{backNineScore}</td>

						<td>77</td>
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
		</>
	);
};

export default Scorecard;
