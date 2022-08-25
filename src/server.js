import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import logger from "./utils/logger";
import { configs } from "./configs";
import { connect } from "./utils/database.connection";
import { googleAuth } from "./configs/google.auth";
import { routesinit } from "./api/routes";
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(
  session({
    secret: configs.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: configs.DB_CONNECTION_STRING }),
    cookie: {
      secure: false,
      expires: new Date(Date.now + 10000),
      maxAge: 10000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  res.send(
    `<h2>📚 Library Management System API <a href="http://localhost:8090/auth/google">Login</a></h2>`
  );
  next();
});

app.listen(PORT, () => {
  logger.info(`🚀 Server is up and running on PORT ${PORT}`);
  connect();
  routesinit(app, passport, logger);
  googleAuth(passport);
});
