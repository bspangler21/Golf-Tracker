import { useParams } from "react-router-dom";
import ValidationSummary from "../../pageComponents/ValidationSummary";
// import GolferForm from "./GolferForm";
import { LeagueDate } from "../../types/LeagueDate";
import { useFetchDate, useUpdateDate } from "../../hooks/LeagueDateHooks";
import DateForm from "./DateForm";
import { mockDates } from "../../mockData/mockDates";

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

let dateData: LeagueDate = {} as LeagueDate;

const EditDate = () => {
	const { id } = useParams();
	if (!id) throw Error("Need a leagueDate id");
	const dateId = id;

	const { data, status, isSuccess } = useFetchDate(dateId);
	const updateDateMutation = useUpdateDate();

	console.log("data", data);

	if (!isSuccess) return <ApiStatus status={status} />;

	dateData = data ?? mockDates[0];

	// useEffect(() => {
	// 	dateData = data ?? getGolferById(dateId, mockGolfers);
	// }, [data]);

	console.log("dateData", dateData);

	const leagueDate: LeagueDate = {
		id: dateData.id,
		leagueId: dateData.leagueId,
		matchDate: dateData.matchDate,
		matchWeekNumber: dateData.matchWeekNumber,
	};

	console.log("leagueDate", leagueDate);

	return (
		<>
			{updateDateMutation.isError && (
				<ValidationSummary error={updateDateMutation.error} />
			)}
			{leagueDate && (
				<DateForm
					leagueDate={leagueDate}
					submitted={(d) => {
						updateDateMutation.mutate(d);
					}}
					isEdit={true}
				/>
			)}
		</>
	);
};

export default EditDate;
