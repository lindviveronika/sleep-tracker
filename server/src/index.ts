import config from "./config.js";
import express from "express";
import cors from "cors";
import corsOptions from "./corsOptions.js";

import sleepEntryRouter from "./routes/sleepEntry.routes.js";

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
