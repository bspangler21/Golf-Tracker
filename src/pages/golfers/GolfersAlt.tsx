import { ReactNode, useState } from "react";
import {
  IGolfer,
  mockGolfers,
  mockGolfersString,
} from "../../mockData/mockGolfers";
import GolferRow from "./GolferRow";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./GolfersAlt.css";
import { useNavigate } from "react-router-dom";

const golfers = mockGolfers; // as ReactNode;

// export default function GolfersAlt() {
//   const golfersList = golfers ? (
//     golfers.map((golfer) => <li>{golfer}</li>)
//   ) : (
//     <li></li>
//   );
//   return <ul>{golfersList}</ul>;
// }

let golfersArray: IGolfer[] = [];

// interface IUser {
// 	name: string;
// 	username: string;
// 	email: string;
// 	id: number;
// }

// function getMockJsonData() {
// 	axios
// 		.get("https://jsonplaceholder.typicode.com/users")
// 		.then((response) => {
// 			console.log("axios response", response.data);

// 			response.data.forEach((r) => {
// 				golfersArray.push({
// 					firstName: r.name,
// 					lastName: r.username,
// 					handicap: r.id,
// 				});
// 				console.log("golfer added", r.name);
// 			});
// 			// golfersArray.push({
// 			// 	firstName: response.name,
// 			// 	lastName: response.username,
// 			// 	handicap: response.id,
// 			// });
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});

// 	return golfersArray;
// }

// console.log("golfersArray", getMockJsonData());

const GolfersAlt = () => {
  const nav = useNavigate();

  function handleItemClick(event: React.MouseEvent<HTMLElement>): void {
    nav(`/golfer-detail`);
  }

  // const [golfers, setGolfers] = useState(golfersArray);

  return (
    <Table
      bordered
      hover
      responsive
      // className="table"
      striped="columns"
      variant="dark"
      size="lg"
    >
      <thead>
        <tr>
          <th colSpan={2} className="tableHeader">
            <a className="tableHeader" href={`/`}>
              Handicap
            </a>
          </th>
          <th colSpan={4} className="tableHeader">
            First Name
          </th>
          <th className="tableHeader">Last Name</th>
        </tr>
      </thead>
      <tbody className="tableBody">
        {golfers.map((g) => (
          <>
            <tr key={g.id} onClick={() => nav(`/golfer-detail/${g.id}`)}>
              <td colSpan={2}>{g.handicap}</td>
              <td colSpan={4}>{g.firstName}</td>
              <td>{g.lastName}</td>
            </tr>
          </>
        ))}
        {/* <tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<td>3</td>
					<td colSpan={2}>Larry the Bird</td>
					<td>@twitter</td>
				</tr> */}
      </tbody>
    </Table>
  );

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
