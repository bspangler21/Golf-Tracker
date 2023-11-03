import { IGolfer } from "../types/IGolfer";

export const mockGolfers: IGolfer[] = [
  {
    id: 1,
    firstName: "Brett",
    lastName: "Spangler",
    handicap: 4,
    scores: [4, 3, 4, 5, 5, 5, 5, 5, 5],
  },
  {
    id: 2,
    firstName: "Paul",
    lastName: "Spangler",
    handicap: 10,
    scores: [4, 3, 4, 5, 5, 5, 5, 5, 5],
  },
  {
    id: 3,
    firstName: "Byron",
    lastName: "Walleser",
    handicap: 7,
    scores: [4, 3, 4, 5, 5, 5, 5, 5, 5],
  },
];

export const mockGolfersString = [
  "Brett Spangler - Handicap: 6",
  "Byron Walleser - Handicap: 7",
  "Paul Spangler - Handicap: 12",
];
