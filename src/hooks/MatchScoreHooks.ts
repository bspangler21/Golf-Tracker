import { useMutation, useQuery, useQueryClient } from "react-query";
import { MatchScore } from "../types/MatchScore";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Problem } from "../types/Problem";

const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

export const useFetchMatchScores = () => {
	// console.log("api url", apiURL);
	return useQuery<MatchScore[]>("matchScores", () => {
		return fetch(`${apiURL}/api/MatchScores`).then((res) => res.json());
	});
};

export const useFetchMatchScore = (id: string) => {
	return useQuery<MatchScore>(["matchScores", id], () => {
		return fetch(`${apiURL}/api/MatchScores/${id}`).then((res) =>
			res.json()
		);
	});
};

export const useAddMatchScore = () => {
	const queryClient = useQueryClient();
	// const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, MatchScore>(
		(matchScore) => axios.post(`${apiURL}/api/MatchScores`, matchScore),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("matchScores");
				// window.history.back();
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

export const useAddMatchScoreNoMutation = (matchId: string) => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, MatchScore>(
		(matchScore) => axios.post(`${apiURL}/api/MatchScores`, matchScore),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("matchScores");
				nav(`/matches/${matchId}`);
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

export const useUpdateMatchScore = (dateId: string) => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	// Will not work if matchScoreId not included at the end of the URL
	return useMutation<AxiosResponse, AxiosError<Problem>, MatchScore>(
		(g) => axios.put(`${apiURL}/api/MatchScores/${g.id}`, g),
		{
			onSuccess: (_, _matchScore) => {
				queryClient.invalidateQueries("matchScores");
				// nav(`/matchScore-detail/${matchScore.id}`);
				nav(`/matches/${dateId}`);
			},
		}
	);
};

export const useDeleteMatchScore = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, MatchScore>(
		(g) => axios.delete(`${apiURL}/api/MatchScores/${g.id}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("matchScores");
				nav(`/matchScores`);
			},
		}
	);
};
