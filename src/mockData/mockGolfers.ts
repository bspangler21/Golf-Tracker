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
    handicap: 6,
  },
  {
    firstName: "Paul",
    lastName: "Spangler",
    handicap: 12,
  },
];
