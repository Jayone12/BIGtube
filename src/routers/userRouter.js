import express from "express";
import { getJoin } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/join", getJoin);

export default userRouter;
