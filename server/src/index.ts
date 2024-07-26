import config from "./config";
import express from "express";
import cors from "cors";
import corsOptions from "./corsOptions";

import sleepEntryRouter from "./routes/sleepEntry.routes";

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors(corsOptions));

/* Routes */
app.use(sleepEntryRouter);

const port = config.port;

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
