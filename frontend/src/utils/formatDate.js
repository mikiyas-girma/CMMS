export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",

    timeZone: "UTC", // Adjust as needed
  });
  return formattedDate;
};
