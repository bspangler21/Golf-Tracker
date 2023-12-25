import { Golfer } from "../types/Golfer";

export const mockGolfers: Golfer[] = [
	{
		id: "6434dce4c909c69981fe99ce",
		firstName: "Brett",
		lastName: "Spangler",
		handicap: 4,
		profilePicture: "/images/profile.jpg",
		// Needed to make dynamic scorecard run
		// scores: [4, 3, 4, 5, 5, 5, 5, 5, 5, 0],
	},
	{
		id: "6434dce4c909c69981fe99cf",
		firstName: "Paul",
		lastName: "Spangler",
		handicap: 10,
		// scores: [4, 3, 4, 5, 5, 5, 5, 5, 5, 0],
	},
	{
		id: "6434dce4c909c69981fe99d0",
		firstName: "Byron",
		lastName: "Walleser",
		handicap: 8,
		// scores: [4, 3, 4, 5, 5, 5, 5, 5, 5, 0],
	},
	{
		id: "65891fbc1625bd334810e52a",
		firstName: "Nate",
		lastName: "Wagner",
		handicap: 8,
	},
];
