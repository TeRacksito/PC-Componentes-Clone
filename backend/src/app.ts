/// <reference path="@types/all.d.ts" />
import cookieParser from "cookie-parser";
import cors from "cors";
import { randomBytes } from "crypto";
import express from "express";
import session from "express-session";
import { errorHandler } from "./middlewares/errorHandler";
import { HttpError } from "./middlewares/HttpError";
import { clientRoutes } from "./routers/clientRoutes";
import { dynamicRouter } from "./routers/dynamicRouter";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";

// Secrets creation
process.env.JWT_SECRET = randomBytes(64).toString("hex");
process.env.SESSION_SECRET = randomBytes(64).toString("hex");

const app = express();

const redisClient = createClient();

const corsOptions = {
  origin: "http://localhost:5012",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser(randomBytes(64).toString("hex")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: "auto" },
  }),
);

app.use("/api/client", clientRoutes);
app.use("/api", dynamicRouter);

app.use((req, _, next) => {
  const error = new HttpError(
    "Not found",
    404,
    new Error(`Cannot ${req.method} ${req.url}`),
  );
  next(error);
});
app.use(errorHandler);

export default app;
