import { Golfer } from "../types/Golfer";

export const mockGolfers: Golfer[] = [
	{
		id: 1,
		firstName: "Brett",
		lastName: "Spangler",
		handicap: 4,
		profilePicture: "/images/profile.jpg",
		// Needed to make dynamic scorecard run
		// scores: [4, 3, 4, 5, 5, 5, 5, 5, 5, 0],
	},
	{
		id: 2,
		firstName: "Paul",
		lastName: "Spangler",
		handicap: 10,
		// scores: [4, 3, 4, 5, 5, 5, 5, 5, 5, 0],
	},
	{
		id: 3,
		firstName: "Byron",
		lastName: "Walleser",
		handicap: 8,
		// scores: [4, 3, 4, 5, 5, 5, 5, 5, 5, 0],
	},
	{ id: 4, firstName: "Nate", lastName: "Wagner", handicap: 8 },
];
