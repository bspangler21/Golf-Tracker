import { useQuery, useQueryClient } from "react-query";
import { Golfer } from "../types/Golfer";

export const useFetchGolfers = () => {
  const queryClient = useQueryClient();
	return useQuery<Golfer[]>("golfers", () => {
		return fetch("http://localhost:4000/api/Golfers").then((res) =>
			res.json()
		);
	});
};

export const useFetchGolfer = (id: string) => {
  const queryClient = useQueryClient();
	return useQuery<Golfer>(["golfer", id], () => {
		return fetch(`http://localhost:4000/api/Golfers/${id}`).then((res) =>
			res.json()
		);
	});
};
