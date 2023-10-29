import reactLogo from "../../assets/react.svg";
import { mockGolfers } from "../../mockData/mockGolfers";
import "./GolferDetail.css";
import { Link, useParams } from "react-router-dom";
import { mergeStyleSets } from "@fluentui/react";
import {getGolferById} from "../../util/golfer";
import utilStyles from "../../styles/utilStyles.module.css";

const allGolfers = mockGolfers;

const classNames = mergeStyleSets({
	mainBlock: {
		display: "block",
	},
});

// function getGolferById(id: number): IGolfer {
// 	let golferDetail: IGolfer = {} as IGolfer;

// 	allGolfers.forEach((g) => {
// 		if (g.id === id) {
// 			(golferDetail.id = g.id),
// 				(golferDetail.firstName = g.firstName),
// 				(golferDetail.lastName = g.lastName),
// 				(golferDetail.handicap = g.handicap);
// 		}
// 	});
// 	return golferDetail;
// }

const GolferDetail = () => {
	const { id } = useParams();
	if (!id) throw Error("Golfer id not found");

	const golferId = parseInt(id);
	const golferData = getGolferById(golferId);

	console.log(golferId);
	console.log("golferData", golferData);

	return (
		<>
			<div className={classNames.mainBlock}>
				<img src={reactLogo} alt="" className="GolferImage"></img>
				<h1 className={utilStyles.headerText}>
					{golferData.firstName} {golferData.lastName}
				</h1>
				<text>{golferData.handicap}</text>
			</div>
		</>
	);
};

export default GolferDetail;
