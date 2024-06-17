import { Router } from "express";
import sleepEntryRepository from "../sleepEntryRepository";
import { Request, Response } from "express";
import { parseDate } from "../utils/parseDate";
import ParsingError from "../errors/ParsingError";

const sleepEntryRouter = Router();

sleepEntryRouter.get("/sleep-entries", async (_req: Request, res: Response) => {
  const sleepEntries = await sleepEntryRepository.getAll();
  res.send(sleepEntries);
});

sleepEntryRouter.post("/sleep-entries", async (req: Request, res: Response) => {
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

export default sleepEntryRouter;
