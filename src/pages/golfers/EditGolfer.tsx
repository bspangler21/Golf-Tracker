import { useParams } from "react-router-dom";
import { useFetchGolfer, useUpdateGolfer } from "../../hooks/GolferHooks";
import ValidationSummary from "../../pageComponents/ValidationSummary";
import GolferForm from "./GolferForm";
import { Golfer } from "../../types/Golfer";

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

const EditGolfer = () => {
	const { id } = useParams();
	if (!id) throw Error("Need a golfer id");
	const golferId = id;

	const { data, status, isSuccess } = useFetchGolfer(golferId);
	const updateGolferMutation = useUpdateGolfer();

	console.log("data", data);

	if (!isSuccess) return <ApiStatus status={status} />;

	const golfer: Golfer = {
		id: data?.id,
		firstName: data?.firstName,
		lastName: data?.lastName,
		handicap: data?.handicap,
	};

	return (
		<>
			{updateGolferMutation.isError && (
				<ValidationSummary error={updateGolferMutation.error} />
			)}
			{data && (
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
