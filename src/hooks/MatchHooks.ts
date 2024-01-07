import { useMutation, useQuery, useQueryClient } from "react-query";
import { Match } from "../types/Match";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Problem } from "../types/Problem";

const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

export const useFetchMatches = () => {
	// console.log("api url", apiURL);
	return useQuery<Match[]>("matches", () => {
		return fetch(`${apiURL}/api/Matches`).then((res) => res.json());
	});
};

export const useFetchMatch = (id: string) => {
	return useQuery<Match>(["matches", id], () => {
		return fetch(`${apiURL}/api/Matches/${id}`).then((res) => res.json());
	});
};

export const useAddMatch = () => {
	const queryClient = useQueryClient();
	// const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Match>(
		(matchScore) => axios.post(`${apiURL}/api/Matches`, matchScore),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("matches");
				window.history.back();
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

export const useUpdateMatch = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	// Will not work if matchScoreId not included at the end of the URL
	return useMutation<AxiosResponse, AxiosError<Problem>, Match>(
		(g) => axios.put(`${apiURL}/api/Matches/${g.id}`, g),
		{
			onSuccess: (_, _matchScore) => {
				queryClient.invalidateQueries("matches");
				// nav(`/matchScore-detail/${matchScore.id}`);
				nav("/matches");
			},
		}
	);
};

export const useDeleteMatch = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, Match>(
		(g) => axios.delete(`${apiURL}/api/Matches/${g.id}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("matches");
				nav(`/matches`);
			},
		}
	);
};
