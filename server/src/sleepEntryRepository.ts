import { Collection, InsertOneResult } from "mongodb";
import db from "./db";
import { Repository, SleepEntry } from "./types";

class SleepEntryRepository implements Repository<SleepEntry> {
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

export default new SleepEntryRepository();
