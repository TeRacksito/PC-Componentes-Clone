/// <reference path="@types/all.d.ts" />
import { RedisStore } from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import { randomBytes } from "crypto";
import express from "express";
import session from "express-session";
import { createClient } from "redis";
import { errorHandler } from "./middlewares/errorHandler";
import { HttpError } from "./middlewares/HttpError";
import { rootRouter } from "./routers/rootRouter";

// Secrets creation
process.env.JWT_SECRET = randomBytes(64).toString("hex");
process.env.SESSION_SECRET = randomBytes(64).toString("hex");

const app = express();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis client error:", err);
});

redisClient.connect().catch(console.error);

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

app.use((req, _, next) => {
  // under testing
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
  }
  next();
});

app.use("/api", rootRouter);

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
