import express from "express";
import { trending } from "../controllers/VideoControllers";

const rootRouter = express.Router();

rootRouter.get("/", trending);

export default rootRouter;
