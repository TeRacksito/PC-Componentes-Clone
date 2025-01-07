import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { HttpError } from "./middlewares/HttpError";
import { dynamicRouter } from "./routers/dynamicRouter";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", dynamicRouter);

app.use((req, res, next) => {
  const error = new HttpError(
    "Not found",
    404,
    new Error(`Cannot ${req.method} ${req.url}`)
  );
  next(error);
});
app.use(errorHandler);

export default app;
