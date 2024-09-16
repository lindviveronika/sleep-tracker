import { Router } from "express";
import {
  addSleepEntry,
  getSleepEntries,
} from "../controllers/sleepEntry.controller.js";
import { Request, Response } from "express";

const sleepEntryRouter = Router();

sleepEntryRouter.get("/sleep-entries", async (req: Request, res: Response) => {
  const { statusCode, data } = await getSleepEntries();
  res.status(statusCode).send(data);
});

sleepEntryRouter.post("/sleep-entries", async (req: Request, res: Response) => {
  const { date, sleepTime, wakeupTime } = req.body;
  const { statusCode, data } = await addSleepEntry(date, sleepTime, wakeupTime);
  res.status(statusCode).send(data);
});

export default sleepEntryRouter;
