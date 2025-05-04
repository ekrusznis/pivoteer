
import { getYear } from "date-fns";

export const getYerars = (): number[] => {
  const startYear = getYear(new Date()) - 100;
  const endYear = getYear(new Date());
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return years;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits for the day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is zero-based, so add 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`; // Format as DD.MM.YYYY
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year}, ${hour}:${minute}h`; // Format as DD.MM.YYYY, HH:MM:SS
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  const roundedValue = value % 1 === 0 ? value : value.toFixed(2);

  return `${roundedValue} ${sizes[i]}`;
};
