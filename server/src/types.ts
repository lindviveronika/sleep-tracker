import { Document, InsertOneResult } from "mongodb";

export interface SleepEntry extends Document {
  fellAsleepAt: Date;
  wokeUpAt: Date;
}

export interface Repository<T extends Document> {
  insertOne(document: T): Promise<InsertOneResult<T>>;
}
