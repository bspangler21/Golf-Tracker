import { Label, TextField } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { mockHoles } from "../../mockData/mockHoles";
import { IHole } from "../../types/IHole";

const golfHoles: IHole[] = mockHoles;

const Scorecard = () => {
	const [frontNineScore, setFrontNineScore] = useState(0);
	let holeScore: number = 0;

	console.log("frontNineScore", frontNineScore);

	function handleOnChange(
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		newValue?: string | undefined
	): void {
		if (newValue) {
			holeScore = parseInt(newValue);
			setFrontNineScore(holeScore);
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
					{golfHoles.map((h, holeNumber) => (
						<tr key={holeNumber}>
							<td>
								<TextField></TextField>
							</td>
						</tr>
					))}
					<tr>
						<td>
							<Label>39</Label>
						</td>
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
