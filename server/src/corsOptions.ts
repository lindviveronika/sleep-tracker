import config from "./config";

const corsOptions = {
  origin: config.clientUrl,
};

export default corsOptions;
