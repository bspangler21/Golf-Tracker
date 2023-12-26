import { useMutation, useQuery, useQueryClient } from "react-query";
import { Golfer } from "../types/Golfer";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Problem } from "../types/Problem";

const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

export const useFetchGolfers = () => {
	console.log("api url", apiURL);
	return useQuery<Golfer[]>("golfers", () => {
		return fetch(`${apiURL}/api/Golfers`).then((res) => res.json());
	});
};

export const useFetchGolfer = (id: string) => {
	return useQuery<Golfer>(["golfers", id], () => {
		return fetch(`${apiURL}/api/Golfers/${id}`).then((res) => res.json());
	});
};

export const useAddGolfer = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Golfer>(
		(golfer) => axios.post(`${apiURL}/api/Golfers`, golfer),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("golfers");
				nav("/golfers");
			},
			onError: (error) => {
				if (error.response?.status === 405) {
					// Handle 405 error here
					console.error("405 Method Not Allowed");
				} else {
					// Handle other errors here
					console.error(error.message);
				}
			},
		}
	);
};

export const useUpdateGolfer = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Golfer>(
		(g) => axios.put(`${apiURL}/api/Golfers/${g.id}`, g),
		{
			onSuccess: (_, golfer) => {
				queryClient.invalidateQueries("golfers");
				nav(`/golfer-detail/${golfer.id}`);
			},
		}
	);
};
