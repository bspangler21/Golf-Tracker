import { useQuery, useQueryClient } from "react-query";
import { Golfer } from "../types/Golfer";

export const useFetchGolfers = () => {
	return useQuery<Golfer[]>("golfers", () => {
		return fetch("http://localhost:4000/api/Golfers").then((res) =>
			res.json()
		);
	});
};

export const useFetchGolfer = (id: string) => {
	return useQuery<Golfer>(["golfers", id], () => {
		return fetch(`http://localhost:4000/api/Golfers/${id}`).then((res) =>
			res.json()
		);
	});
};
