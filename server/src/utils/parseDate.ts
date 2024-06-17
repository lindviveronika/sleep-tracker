import ParsingError from "../errors/ParsingError";

export const parseDate = (dateString: string) => {
  const date = Date.parse(dateString);
  if (isNaN(date)) {
    throw new ParsingError("Invalid date format");
  }
  return new Date(date);
};
