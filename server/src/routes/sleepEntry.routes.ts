import { Router } from "express";
import {
  addSleepEntry,
  getSleepEntries,
} from "../controllers/sleepEntry.controller";
import { Request, Response } from "express";

const sleepEntryRouter = Router();

sleepEntryRouter.get("/sleep-entries", async (req: Request, res: Response) => {
  const { status, data } = await getSleepEntries();
  res.status(status).send(data);
});

sleepEntryRouter.post("/sleep-entries", async (req: Request, res: Response) => {
  const { fellAsleepAt, wokeUpAt } = req.body;
  const { status, data } = await addSleepEntry(fellAsleepAt, wokeUpAt);
  res.status(status).send(data);
});

export default sleepEntryRouter;
