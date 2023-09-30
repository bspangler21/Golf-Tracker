import { ReactNode, useState } from "react";
import { mockGolfers, mockGolfersString } from "../../mockData/mockGolfers";
import GolferRow from "./GolferRow";


// const golfers = mockGolfersString; // as ReactNode;

// export default function GolfersAlt() {
//   const golfersList = golfers ? (
//     golfers.map((golfer) => <li>{golfer}</li>)
//   ) : (
//     <li></li>
//   );
//   return <ul>{golfersList}</ul>;
// }

const golfersArray = mockGolfers;

const GolfersAlt = () => {
	const [golfers, setGolfers] = useState(golfersArray);

// 	const addGolfer = () => {
// 		setGolfers([
// 			...golfers,
// 			{
// 				firstName: "Mick",
// 				lastName: "Siech",
// 				handicap: 11,
// 			},
// 		]);
// 	};

// 	const 
// 	return (
// 		<>
// 			<table>
// 				<thead>
// 					<tr>
// 						<th>First Name</th>
// 						<th>Last Name</th>
// 						<th>Handicap</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{golfers.map((g) => (
// 						<><tr key={g.firstName + g.lastName} /><td>{g.firstName}</td><td>{g.lastName}</td><td>{g.handicap}</td></>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>

// 		</>
// 	);
};

export default GolfersAlt;
