import { useParams } from "react-router-dom";
import { useFetchGolfer, useUpdateGolfer } from "../../hooks/GolferHooks";
import ValidationSummary from "../../pageComponents/ValidationSummary";
// import GolferForm from "./GolferForm";
import { Golfer } from "../../types/Golfer";
import { mockGolfers } from "../../mockData/mockGolfers";
import {
	calculateHandicap,
	getGolferById,
	getGolferMatchScores,
} from "../../util/golferUtils";
import GolferForm from "./GolferForm";
import { mockCourses } from "../../mockData/mockCourses";
import { Course } from "../../types/Course";
import { getLakeBreeze } from "../../util/courseUtils";

let LakeBreezeCourseId: string = "658cfca75669234ca16a65d8";
const course: Course | undefined = getLakeBreeze(
	LakeBreezeCourseId,
	mockCourses
);

type Args = {
	status: "idle" | "success" | "error" | "loading";
};

const ApiStatus = ({ status }: Args) => {
	switch (status) {
		case "error":
			return <div>Error communicating with the data backend</div>;
		case "idle":
			return <div>Idle</div>;
		case "loading":
			return <div>Loading..</div>;
		default:
			throw Error("Unknown API state");
	}
};

let golferData: Golfer = {} as Golfer;

const EditGolfer = () => {
	const { id } = useParams();
	if (!id) throw Error("Need a golfer id");
	const golferId = id;

	const { data, status, isSuccess } = useFetchGolfer(golferId);
	const updateGolferMutation = useUpdateGolfer();

	console.log("data", data);

	if (!isSuccess) return <ApiStatus status={status} />;

	golferData = data ?? getGolferById(golferId);

	// useEffect(() => {
	// 	golferData = data ?? getGolferById(golferId, mockGolfers);
	// }, [data]);

	console.log("golferData", golferData);
	console.log("golferMatchScores", getGolferMatchScores(golferData.id ?? ""));

	const golfer: Golfer = {
		id: golferData.id,
		firstName: golferData.firstName,
		lastName: golferData.lastName,
		handicap:
			course &&
			golferData.id &&
			calculateHandicap(
				getGolferMatchScores(golferData.id),
				course?.slopeRating,
				course?.courseRating
			) !== undefined
				? calculateHandicap(
						getGolferMatchScores(golferData.id),
						course?.slopeRating,
						course?.courseRating / 2
				  )
				: 0,
	};

	console.log("golfer", golfer);

	return (
		<>
			{updateGolferMutation.isError && (
				<ValidationSummary error={updateGolferMutation.error} />
			)}
			{golfer && (
				<GolferForm
					golfer={golfer}
					submitted={(g) => {
						updateGolferMutation.mutate(g);
					}}
				/>
			)}
		</>
	);
};

export default EditGolfer;
