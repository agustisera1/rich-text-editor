/**
 * Formats a given date string into a localized date and time string.
 *
 * @param dateString - The date string to format.
 * @returns A string representing the formatted date and time in the user's locale.
 *
 * The formatted date will be in the format "MM/DD/YYYY" and the time will be in the format "HH:MM".
 * The date and time are separated by " at ".
 *
 * Example:
 * ```typescript
 * const formatted = formatDate("2023-10-05T14:48:00.000Z");
 * console.log(formatted); // Output: "10/05/2023 at 02:48 PM" (depending on the user's locale)
 * ```
 */
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
