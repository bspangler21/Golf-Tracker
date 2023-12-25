import { useAddGolfer } from "../../hooks/GolferHooks";
import { Golfer } from "../../types/Golfer";
import GolferForm from "./GolferForm";

const AddGolfer = () => {
	const addGolferMutation = useAddGolfer();

	const golfer: Golfer = {
		id: "0",
    firstName: "",
    lastName: "",
    handicap: 0,
	};

	return (
		<>
			{/* {addHouseMutation.isError && (
				<ValidationSummary error={addHouseMutation.error} />
			)} */}
			<GolferForm
				golfer={golfer}
				submitted={(golfer) => addGolferMutation.mutate(golfer)}
			/>
		</>
	);
};

export default AddGolfer;
