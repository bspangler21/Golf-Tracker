export interface IGolfer {
  firstName: string;
  lastName: string;
  handicap: number;
}

export interface IGolfers {
  golfers: IGolfer[];
}

export const mockGolfers: IGolfer[] = [
  {
    firstName: "Brett",
    lastName: "Spangler",
    handicap: 4,
  },
  {
    firstName: "Paul",
    lastName: "Spangler",
    handicap: 10,
  },
  {
    firstName: "Byron",
    lastName: "Walleser",
    handicap: 7,
  },
];

export const mockGolfersString = [
  "Brett Spangler - Handicap: 6",
  "Byron Walleser - Handicap: 7",
  "Paul Spangler - Handicap: 12",
];
