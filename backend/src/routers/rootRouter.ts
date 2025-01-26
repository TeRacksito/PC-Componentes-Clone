import { Router } from "express";
import { cartRoutes } from "./cartRoutes";
import { clientRoutes } from "./clientRoutes";
import { dynamicRouter } from "./dynamicRouter";
import { searchRoutes } from "./searchRoutes";

export const rootRouter = Router();

rootRouter.get("/health", (_, res) => {
  res.status(200).send("OK");
  return;
});

rootRouter.use("/search", searchRoutes);
rootRouter.use("/cart", cartRoutes);
rootRouter.use("/client", clientRoutes);

// dynamic router always goes last
rootRouter.use("/", dynamicRouter);
