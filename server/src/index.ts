import http, { IncomingMessage, ServerResponse } from "node:http";
import { MongoClient } from "mongodb";
import config from "./config";

type SleepEntry = {
  fellAsleepAt: Date;
  wokeUpAt: Date;
};

if (!config.mongodbUser || !config.mongodbPassword) {
  throw new Error("Missing MongoDB credentials");
}

const hostname = config.hostname;
const port = config.port;
const userName = encodeURIComponent(config.mongodbUser);
const password = encodeURIComponent(config.mongodbPassword);
const authMechanism = "DEFAULT";
const databaseName = config.databaseName;
const mongoUri = `mongodb://${userName}:${password}@${config.mongodbUrl}/?authMechanism=${authMechanism}`;
const mongoClient = new MongoClient(mongoUri);

mongoClient.connect();
console.log("Connected to MongoDB");
const db = mongoClient.db(databaseName);
console.log(`Using database: ${databaseName}`);

const collection = db.collection<SleepEntry>("sleepEntries");
collection.insertOne({
  fellAsleepAt: new Date("2024-06-10"),
  wokeUpAt: new Date("2024-06-11"),
});

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  }
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
