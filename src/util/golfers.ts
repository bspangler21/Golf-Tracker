import { Golfer } from "../types/Golfer";
import { mockGolfers } from "../mockData/mockGolfers";
import { useFetchGolfers } from "../hooks/GolferHooks";

// const golfers: Golfer[] = mockGolfers;
// const testGolfers: Golfer[] = mockGolfers;
// const { data: golfers } = useFetchGolfers() ?? [];

// export function getAllGolferIds() {
// 	return (golfers as Golfer[]).map((i) => {
// 		return {
// 			params: {
// 				id: i.id,
// 			},
// 		};
// 	});
// }

// export function fetchGolfers() {
// 	const returnedGolfers = fetch("http://localhost:4000/api/Golfers").then(
// 		(response) => response.json()
// 	);
// 	return returnedGolfers;
// }

export function getGolferById(id: string, golfers: Golfer[]): Golfer {
	let golferDetail: Golfer = {} as Golfer;

	if (golfers) {
		golfers.forEach((g) => {
			if (g.id === id) {
				(golferDetail.id = g.id),
					(golferDetail.firstName = g.firstName),
					(golferDetail.lastName = g.lastName),
					(golferDetail.handicap = g.handicap);
			}
		});
	}

	return golferDetail;
}
