export interface LeagueDate {
  matchDate: Date;
  matchWeekNumber: number;
}

export interface LeagueDates {
  matchDates: LeagueDate[];
}

export const mockDates: LeagueDate[] = [
  {
    matchDate: new Date("09-05-2023"),
    matchWeekNumber: 20,
  },
  {
    matchDate: new Date("09-12-2023"),
    matchWeekNumber: 21,
  },
  {
    matchDate: new Date("09-19-2023"),
    matchWeekNumber: 22,
  },
];
