import { Document, InsertOneResult } from "mongodb";

export interface SleepEntry extends Document {
  date: Date;
  sleepTime: string;
  wakeupTime: string;
}

export interface Service<T extends Document> {
  insertOne(document: T): Promise<InsertOneResult<T>>;
}

// TODO: Rename this to something more descriptive
export interface Result {
  statusCode: number;
  data: any;
}
