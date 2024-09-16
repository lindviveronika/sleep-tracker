import config from "./config.js";

const corsOptions = {
  origin: config.clientUrl,
};

export default corsOptions;
