export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const month = date.getMonth() + 1; // Months are 0-based in JavaScript
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
};

export const teeTimes = ["3:30 PM", "3:37 PM", "3:45 PM"];
