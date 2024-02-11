import { useMutation, useQuery, useQueryClient } from "react-query";
import { LeagueDate } from "../types/LeagueDate";
import { Problem } from "../types/Problem";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const apiURL = import.meta.env.DEV ? "http://localhost:4000" : "";

export const useFetchDates = () => {
	// console.log("api url", apiURL);
	return useQuery<LeagueDate[]>("leagueDates", () => {
		return fetch(`${apiURL}/api/Dates`).then((res) => res.json());
	});
};

export const useFetchDate = (id: string) => {
	return useQuery<LeagueDate>(["leagueDates", id], () => {
		return fetch(`${apiURL}/api/Dates/${id}`).then((res) => res.json());
	});
};

export const useAddDate = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, LeagueDate>(
		(leagueDate) => axios.post(`${apiURL}/api/Dates`, leagueDate),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("leagueDates");
				// nav("/schedule-list");
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

export const useUpdateDate = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	// Will not work if golferId not included at the end of the URL
	return useMutation<AxiosResponse, AxiosError<Problem>, LeagueDate>(
		(g) => axios.put(`${apiURL}/api/Dates/${g.id}`, g),
		{
			onSuccess: (_, _golfer) => {
				queryClient.invalidateQueries("leagueDates");
				// nav(`/golfer-detail/${golfer.id}`);
				nav("/schedule-list");
			},
		}
	);
};

export const useDeleteDate = () => {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	return useMutation<AxiosResponse, AxiosError<Problem>, LeagueDate>(
		(g) => axios.delete(`${apiURL}/api/Dates/${g.id}`),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("leagueDates");
				nav(`/schedule-list`);
			},
		}
	);
};
