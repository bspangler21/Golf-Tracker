import axios, { AxiosResponse, AxiosError } from "axios";
import { Match } from "date-fns";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Hole } from "../types/Hole";
import { Problem } from "../types/Problem";

const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";
let apiPath = "";

export const useFetchHoles = () => {
	// console.log("api url", apiURL);
	return useQuery<Hole[]>("holes", () => {
		return fetch(`${apiURL}/api/Holes`).then((res) => res.json());
	});
};

export const useFetchHole = (id: string) => {
	return useQuery<Hole>(["holes", id], () => {
		return fetch(`${apiURL}/api/Holes/${id}`).then((res) => res.json());
	});
};

export const useAddHole = () => {
	const queryClient = useQueryClient();
	// const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Hole>(
		(golfer) => axios.post(`${apiURL}/api/Holes`, golfer),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("holes");
				// nav("/holes");
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

export const useUpdateHole = () => {
	const queryClient = useQueryClient();
	// const nav = useNavigate();

	return useMutation<AxiosResponse, AxiosError<Problem>, Hole>(
		(g) => axios.put(`${apiURL}/api/Holes/${g.id}`, g),
		{
			onSuccess: (_, _hole) => {
				queryClient.invalidateQueries("holes");
				// nav(`/golfer-detail/${golfer.id}`);
				// nav("/holes");
			},
		}
	);
};

export const useDeleteHole = () => {
	const queryClient = useQueryClient();
	// const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Hole>(
		(g) => axios.delete(`${apiURL}/api/Holes/${g.id}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("holes");
				// nav(`/holes`);
			},
		}
	);
};
