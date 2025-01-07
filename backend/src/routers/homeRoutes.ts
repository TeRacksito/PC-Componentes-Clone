import { Router } from "express";
import { getHome } from "../controllers/homeController";

export const homeRouter = Router();

homeRouter.get("/", getHome);
