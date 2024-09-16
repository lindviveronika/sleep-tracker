import { parseDate } from "../utils/parseDate.js";
import sleepEntryService from "../services/sleepEntry.service.js";
import { Result } from "../types.js";

export async function addSleepEntry(
  date: string,
  sleepTime: string,
  wakeupTime: string
): Promise<Result> {
  if (!date || !sleepTime || !wakeupTime) {
    return {
      statusCode: 400,
      data: "Missing required fields",
    };
  }

  const parsedDate = parseDate(date);

  if (parsedDate == null) {
    return {
      statusCode: 400,
      data: "Dates must be in date time string format",
    };
  }

  const result = await sleepEntryService.insertOne({
    date: parsedDate,
    sleepTime,
    wakeupTime,
  });

  return {
    statusCode: 201,
    data: result.insertedId,
  };
}

export async function getSleepEntries(): Promise<Result> {
  const sleepEntries = await sleepEntryService.getAll();

  return {
    statusCode: 200,
    data: sleepEntries,
  };
}
