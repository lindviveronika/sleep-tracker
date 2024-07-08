import { parseDate } from "../utils/parseDate";
import sleepEntryService from "../services/sleepEntry.service";

interface Result {
  statusCode: number;
  data: any;
}

export async function addSleepEntry(
  fellAsleepAt: string,
  wokeUpAt: string
): Promise<Result> {
  if (!fellAsleepAt || !wokeUpAt) {
    return {
      statusCode: 400,
      data: "Missing required fields",
    };
  }

  const fellAsleepAtDate = parseDate(fellAsleepAt);
  const wokeUpAtDate = parseDate(wokeUpAt);

  if (fellAsleepAtDate == null || wokeUpAtDate == null) {
    return {
      statusCode: 400,
      data: "Dates must be in date time string format",
    };
  }

  const result = await sleepEntryService.insertOne({
    fellAsleepAt: fellAsleepAtDate,
    wokeUpAt: wokeUpAtDate,
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
