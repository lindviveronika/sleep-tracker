import { parseDate } from "../utils/parseDate";
import ParsingError from "../errors/ParsingError";
import sleepEntryService from "../services/sleepEntry.service";

interface Result {
  status: number;
  data: any;
}

export async function addSleepEntry(
  fellAsleepAt: string,
  wokeUpAt: string
): Promise<Result> {
  if (!fellAsleepAt || !wokeUpAt) {
    return {
      status: 400,
      data: "Missing required fields",
    };
  }

  try {
    const fellAsleepAtDate = parseDate(fellAsleepAt);
    const wokeUpAtDate = parseDate(wokeUpAt);
    const result = await sleepEntryService.insertOne({
      fellAsleepAt: fellAsleepAtDate,
      wokeUpAt: wokeUpAtDate,
    });

    return {
      status: 201,
      data: result.insertedId,
    };
  } catch (error: unknown) {
    if (error instanceof ParsingError) {
      return {
        status: 400,
        data: error.message,
      };
    }

    throw error;
  }
}

export async function getSleepEntries(): Promise<Result> {
  const sleepEntries = await sleepEntryService.getAll();

  return {
    status: 200,
    data: sleepEntries,
  };
}
