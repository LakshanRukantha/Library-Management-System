import mongoose from "mongoose";

import configs from "../configs";
import logger from "../utils/logger";

let database;

const connect = async () => {
  const MONGODB_URL = configs.DB_CONNECTION_STRING;

  if (!database) {
    mongoose
      .connect(MONGODB_URL)
      .then((connection) => {
        database = connection;
        logger.info("✅ Database Synced.");
      })
      .catch((err) => {
        logger.error(`❌ ${err.message}`);
      });
  }
};

export { connect };
