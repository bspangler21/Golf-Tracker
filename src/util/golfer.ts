import { mockGolfers } from "../mockData/mockGolfers";
import { IGolfer } from "../types/IGolfer";

const allGolfers = mockGolfers;

export function getGolferById(id: number): IGolfer {
	let golferDetail: IGolfer = {} as IGolfer;

	allGolfers.forEach((g) => {
		if (g.id === id) {
			(golferDetail.id = g.id),
				(golferDetail.firstName = g.firstName),
				(golferDetail.lastName = g.lastName),
				(golferDetail.handicap = g.handicap);
		}
	});
	return golferDetail;
}
