export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const userLocale = navigator.language || "en-US";
  const formattedDate = date
    .toLocaleDateString(userLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/-/g, "/");

  const formattedTime = date.toLocaleTimeString(userLocale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} at ${formattedTime}`;
};
