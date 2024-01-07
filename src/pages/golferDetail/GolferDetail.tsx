import reactLogo from "../../assets/react.svg";
// import { mockGolfers } from "../../mockData/mockGolfers";
import "./GolferDetail.css";
import { useNavigate, useParams } from "react-router-dom";
// import { mergeStyleSets } from "@fluentui/react";
// import { getGolferById } from "../../util/golfers";
import utilStyles from "../../styles/utilStyles.module.css";
import MatchListing from "../matches/MatchListing";
import { useFetchGolfer } from "../../hooks/GolferHooks";
import { DefaultButton } from "@fluentui/react";
import { getGolferById, getGolferMatchScores } from "../../util/golfers";
import { mockGolfers } from "../../mockData/mockGolfers";
import { useFetchMatchScores } from "../../hooks/MatchScoreHooks";
import { Golfer } from "../../types/Golfer";
import { MatchScore } from "../../types/MatchScore";
import { ms } from "date-fns/locale";

let golfer: Golfer = {
	id: "0",
	firstName: "",
	lastName: "",
	handicap: 0,
};

let matchScores: MatchScore[] = [];

const GolferDetail = () => {
	const nav = useNavigate();
	const { id } = useParams();
	if (!id) throw Error("Golfer id not found");

	// const golferId = parseInt(id);
	const golferId = id;

	const { data: golferData } = useFetchGolfer(golferId);
	const { data: matchScoreData } = useFetchMatchScores();

	if (import.meta.env.DEV) {
		console.log("golferId", golferId);
		console.log(golferId);
		console.log("golferData", golferData);
	}

	golfer = golferData ?? getGolferById(golferId, mockGolfers);
	let golferDisplayName = `${golfer.firstName} ${golfer.lastName}`;

	matchScores = matchScoreData ?? [];

	// let currentGolferMatchScores: MatchScore[] = matchScores.filter(
	// 	(m) => m.golferId === golferId
	// );

	let currentGolferMatchScores: MatchScore[] = getGolferMatchScores(
		matchScores,
		golferId
	);

	let latestGolferScore = currentGolferMatchScores.reverse()[0].totalScore;

	console.log("matchScores", matchScores);
	console.log("currentGolferMatchScores", currentGolferMatchScores);

	return (
		<>
			<div className={utilStyles.h1Text}>
				<img
					src={reactLogo}
					alt=""
					className={utilStyles.profileImage}
				></img>
				<h2>{golferDisplayName}</h2>
			</div>
			<div>
				<h3 className={utilStyles.h3Text}>
					Handicap: {golfer.handicap}
				</h3>
				<h3 className={utilStyles.h3Text}>
					Rounds Played: {currentGolferMatchScores.length}
				</h3>
				<h3 className={utilStyles.h3Text}>
					Last Score: {latestGolferScore}
				</h3>
			</div>
			<div>
				<h3>Upcoming Matches for {golferDisplayName}</h3>
				<MatchListing isPlayerView={true} playerId={golferId} />
			</div>
			<br></br>
			<div>
				<DefaultButton
					primary
					onClick={() => nav(`/golfer-detail/edit/${golferId}`)}
				>
					Edit Golfer
				</DefaultButton>
			</div>
		</>
	);
};

export default GolferDetail;
