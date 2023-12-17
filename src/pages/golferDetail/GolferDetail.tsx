import reactLogo from "../../assets/react.svg";
// import { mockGolfers } from "../../mockData/mockGolfers";
import "./GolferDetail.css";
import { useParams } from "react-router-dom";
// import { mergeStyleSets } from "@fluentui/react";
import { getGolferById } from "../../util/golfers";
import utilStyles from "../../styles/utilStyles.module.css";
import MatchListing from "../matches/MatchListing";

// const allGolfers = mockGolfers;

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

	console.log("golferId", golferId);

	console.log(golferId);
	console.log("golferData", golferData);

	return (
		<>
			<div className={utilStyles.h1Text}>
				<img
					src={reactLogo}
					alt=""
					className={utilStyles.profileImage}
				></img>
				<h2>
					{golferData.firstName} {golferData.lastName}
				</h2>
			</div>
			<div>
				<h3 className={utilStyles.h3Text}>
					Handicap: {golferData.handicap}
				</h3>
				<h3 className={utilStyles.h3Text}>
					Rounds Played: {Math.round(Math.random() * 25)}
				</h3>
			</div>
			<div>
				<h3>
					Upcoming Matches for {golferData.firstName}{" "}
					{golferData.lastName}
				</h3>
				<MatchListing isPlayerView={true} playerId={golferId} />
			</div>
		</>
	);
};

export default GolferDetail;
