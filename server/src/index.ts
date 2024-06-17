import config from "./config";
import express from "express";
import sleepEntryRouter from "./routes/sleepEntry.routes";

const app = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.use(sleepEntryRouter);

const port = config.port;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
