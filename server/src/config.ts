export default {
  hostname: process.env.HOSTNAME || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  mongodbUrl: process.env.MONGODB_URL,
  databaseName: process.env.MONGODB_DB_NAME,
  mongodbUser: process.env.MONGODB_USER,
  mongodbPassword: process.env.MONGODB_PASSWORD,
};
