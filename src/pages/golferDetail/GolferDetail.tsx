import reactLogo from "../../assets/react.svg";
import "./GolferDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import utilStyles from "../../styles/utilStyles.module.css";
import MatchListing from "../matches/MatchListing";
import { useFetchGolfer, useFetchGolfers } from "../../hooks/GolferHooks";
import { DefaultButton } from "@fluentui/react";
import {
	calculateHandicap,
	getAllTimeAverage,
	getGolferById,
	getGolferMatchScores,
} from "../../util/golferUtils";
import { mockGolfers } from "../../mockData/mockGolfers";
import { useFetchMatchScores } from "../../hooks/MatchScoreHooks";
import { Golfer } from "../../types/Golfer";
import { MatchScore } from "../../types/MatchScore";
import { mockMatchScores } from "../../mockData/mockMatchScores";
import { getLakeBreeze } from "../../util/courseUtils";
import { mockCourses } from "../../mockData/mockCourses";
import { Course } from "../../types/Course";
import { getHardestHoles } from "../../util/holeUtils";

let LakeBreezeCourseId: string = "658cfca75669234ca16a65d8";

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
	const golferId: string = id;

	const { data: golferData } = useFetchGolfer(golferId);
	const {data: allGolfersData} = useFetchGolfers();
	const { data: matchScoreData } = useFetchMatchScores();
	const course: Course | undefined = getLakeBreeze(
		LakeBreezeCourseId,
		mockCourses
	);
	if (!course) throw new Error("Course not found");

	if (import.meta.env.DEV) {
		console.log("golferId", golferId);
		console.log(golferId);
		console.log("golferData", golferData);
	}

	golfer = golferData ?? getGolferById(golferId, allGolfersData ?? mockGolfers);
	matchScores = matchScoreData ?? mockMatchScores;

	let golferDisplayName: string = `${golfer.firstName} ${golfer.lastName}`;

	let currentGolferMatchScores: MatchScore[] =
		getGolferMatchScores(golferId) ?? [];

	let latestGolferScore: number =
		currentGolferMatchScores.length > 0
			? currentGolferMatchScores.reverse()[0].totalScore
			: 0;
	let allTimeGolferAverage: number =
		currentGolferMatchScores.length > 0
			? getAllTimeAverage(currentGolferMatchScores)
			: 0;
	// last parameter is course rating divided by 2
	let golferHandicap: number =
		currentGolferMatchScores.length > 0 && course
			? calculateHandicap(
					currentGolferMatchScores,
					course.slopeRating,
					course.courseRating / 2
			  )
			: golfer.handicap;

	console.log("matchScores", matchScores);
	console.log("currentGolferMatchScores", currentGolferMatchScores);
	console.log("golferHandicap", golferHandicap);
	console.log(
		"getHardestHoles",
		getHardestHoles(course?.id !== undefined ? course?.id : "", 9)
	);

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
					Handicap: {golferHandicap ?? 0}
				</h3>
				<h3 className={utilStyles.h3Text}>
					Rounds Played: {currentGolferMatchScores.length}
				</h3>
				<h3 className={utilStyles.h3Text}>
					Last Score:{" "}
					{currentGolferMatchScores.length === 0
						? "N/A"
						: latestGolferScore}
				</h3>
				<h3 className={utilStyles.h3Text}>
					Golfer Average:{" "}
					{currentGolferMatchScores.length === 0
						? "N/A"
						: allTimeGolferAverage}
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
