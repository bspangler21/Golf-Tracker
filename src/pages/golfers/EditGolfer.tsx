import { useParams } from "react-router-dom";
import { useFetchGolfer, useUpdateGolfer } from "../../hooks/GolferHooks";
import ValidationSummary from "../../pageComponents/ValidationSummary";
// import GolferForm from "./GolferForm";
import { Golfer } from "../../types/Golfer";
import { mockGolfers } from "../../mockData/mockGolfers";
import { getGolferById } from "../../util/golfers";
import GolferForm from "./GolferForm";

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

	golferData = data ?? getGolferById(golferId, mockGolfers);

	// useEffect(() => {
	// 	golferData = data ?? getGolferById(golferId, mockGolfers);
	// }, [data]);

	console.log("golferData", golferData);

	const golfer: Golfer = {
		id: golferData.id,
		firstName: golferData.firstName,
		lastName: golferData.lastName,
		handicap: golferData.handicap,
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
