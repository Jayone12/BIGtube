import express from "express";
import { trending, search } from "../controllers/VideoControllers";

const rootRouter = express.Router();

rootRouter.get("/", trending);
rootRouter.get("/search", search);

export default rootRouter;
