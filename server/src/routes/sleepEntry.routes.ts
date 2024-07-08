import { Router } from "express";
import {
  addSleepEntry,
  getSleepEntries,
} from "../controllers/sleepEntry.controller";
import { Request, Response } from "express";

const sleepEntryRouter = Router();

sleepEntryRouter.get("/sleep-entries", async (req: Request, res: Response) => {
  const { statusCode, data } = await getSleepEntries();
  res.status(statusCode).send(data);
});

sleepEntryRouter.post("/sleep-entries", async (req: Request, res: Response) => {
  const { fellAsleepAt, wokeUpAt } = req.body;
  const { statusCode, data } = await addSleepEntry(fellAsleepAt, wokeUpAt);
  res.status(statusCode).send(data);
});

export default sleepEntryRouter;
