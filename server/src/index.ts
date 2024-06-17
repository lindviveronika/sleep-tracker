import config from "./config";
import sleepEntryRepository from "./sleepEntryRepository";
import express, { Request, Response } from "express";

class ParsingError extends Error {
  statusCode = 400;
  constructor(message?: string) {
    super(message);
  }
}

const parseDate = (dateString: string) => {
  const date = Date.parse(dateString);
  if (isNaN(date)) {
    throw new ParsingError("Invalid date format");
  }
  return new Date(date);
};

const app = express();
app.use(express.json());
const port = config.port;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

app.get("/sleep-entries", async (_req: Request, res: Response) => {
  const sleepEntries = await sleepEntryRepository.getAll();
  res.send(sleepEntries);
});

app.post("/sleep-entries", async (req: Request, res: Response) => {
  if (!req.body.fellAsleepAt || !req.body.wokeUpAt) {
    res.status(400).send("Missing required fields");
    return;
  }

  try {
    const fellAsleepAt = parseDate(req.body.fellAsleepAt);
    const wokeUpAt = parseDate(req.body.wokeUpAt);
    const result = await sleepEntryRepository.insertOne({
      fellAsleepAt,
      wokeUpAt,
    });
    res.status(201).send(result.insertedId);
  } catch (error: unknown) {
    if (error instanceof ParsingError) {
      res.status(400).send(error.message);
    } else {
      throw error;
    }
  }
});
