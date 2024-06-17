import { MongoClient } from "mongodb";
import config from "./config";

if (!config.mongodbUser || !config.mongodbPassword) {
  throw new Error("Missing MongoDB credentials");
}

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

export default db;
