import { useAddDate } from "../../hooks/LeagueDateHooks";
import ValidationSummary from "../../pageComponents/ValidationSummary";
import { LeagueDate } from "../../types/LeagueDate";
import DateForm from "./DateForm";

const AddDate = () => {
	const addDateMutation = useAddDate();

	const leagueDate: LeagueDate = {
		// id: "0",
		leagueId: "658cf9da5669234ca16a65c8",
		matchDate: new Date(),
		matchWeekNumber: 0,
	};

	return (
		<>
			{addDateMutation.isError && (
				<ValidationSummary error={addDateMutation.error} />
			)}
			<DateForm
				leagueDate={leagueDate}
				submitted={(leagueDate) => addDateMutation.mutate(leagueDate)}
			/>
		</>
	);
};

export default AddDate;
