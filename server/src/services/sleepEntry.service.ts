import { Collection, InsertOneResult } from "mongodb";
import db from "../db.js";
import { Service, SleepEntry } from "../types.js";

class SleepEntryService implements Service<SleepEntry> {
  private readonly collection: Collection<SleepEntry>;

  constructor() {
    this.collection = db.collection<SleepEntry>("sleepEntries");
  }

  async insertOne(
    sleepEntry: SleepEntry
  ): Promise<InsertOneResult<SleepEntry>> {
    return await this.collection.insertOne(sleepEntry);
  }

  async getAll(): Promise<SleepEntry[]> {
    return await this.collection.find().toArray();
  }
}

export default new SleepEntryService();
