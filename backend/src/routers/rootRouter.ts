import { Router } from "express";
import { cartRoutes } from "./cartRoutes";
import { clientRoutes } from "./clientRoutes";
import { dynamicRouter } from "./dynamicRouter";

export const rootRouter = Router();

rootRouter.get("/health", (_, res) => {
  res.status(200).send("OK");
});

rootRouter.use("/cart", cartRoutes);
rootRouter.use("/client", clientRoutes);
rootRouter.use("/", dynamicRouter);
