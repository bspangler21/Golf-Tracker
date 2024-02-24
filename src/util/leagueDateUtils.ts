const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

export async function getLeagueDateIdByWeekNumber(weekNumber: number): Promise<string> {
	// const { data: leagueDateData } = useFetchDates();
	const leagueDateData = await fetch(`${apiURL}/api/Dates`).then((res) =>
		res.json()
	);
	let leagueDateId = "";
	// add filtering for leagueId eventually
	leagueDateData?.forEach((date: any) => {
		if (date.matchWeekNumber === weekNumber) {
			leagueDateId = date.id!;
		}
	});

	return leagueDateId;
}
