export const parseDate = (dateString: string) => {
  const date = Date.parse(dateString);
  if (isNaN(date)) {
    return null;
  }
  return new Date(date);
};
