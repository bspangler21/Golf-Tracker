import { useQuery } from "react-query";
import { LeagueDate } from "../types/LeagueDate";

const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

export const useFetchLeagueDates = () => {
	console.log("api url", apiURL);
	return useQuery<LeagueDate[]>("leagueDates", () => {
		return fetch(`${apiURL}/api/Dates`).then((res) => res.json());
	});
};