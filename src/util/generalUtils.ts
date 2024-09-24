export interface DateObject {
  month: number;
  day: number;
  year: number;
}

export const formatDate = (dateString: string): string => {
  const date: Date = new Date(dateString);
  const month: number = date.getMonth() + 1; // Months are 0-based in JavaScript
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const teeTimes = ["3:30 PM", "3:37 PM", "3:45 PM"];
