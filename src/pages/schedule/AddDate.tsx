const AddGolfer = () => {
	const addGolferMutation = useAddGolfer();

	const golfer: Golfer = {
		// id: "0",
		firstName: "",
		lastName: "",
		handicap: 0,
	};

	return (
		<>
			{addGolferMutation.isError && (
				<ValidationSummary error={addGolferMutation.error} />
			)}
			<GolferForm
				golfer={golfer}
				submitted={(golfer) => addGolferMutation.mutate(golfer)}
			/>
		</>
	);
};

export default AddGolfer;
