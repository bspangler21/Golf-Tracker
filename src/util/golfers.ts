import { Golfer } from "../types/Golfer";
import { mockGolfers } from "../mockData/mockGolfers";

const golfers: Golfer[] = mockGolfers;

export function getAllGolferIds() {
	return golfers.map((i) => {
		return {
			params: {
				id: i.id,
			},
		};
	});
}

export function getGolferById(id: number): Golfer {
	let golferDetail: Golfer = {} as Golfer;

	golfers.forEach((g) => {
		if (g.id === id) {
			(golferDetail.id = g.id),
				(golferDetail.firstName = g.firstName),
				(golferDetail.lastName = g.lastName),
				(golferDetail.handicap = g.handicap);
		}
	});
	return golferDetail;
}
