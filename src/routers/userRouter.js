import express from "express";
import {
  finishGithubLogin,
  startGithubLogin,
  logout,
  getEdit,
  postEdit,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);

export default userRouter;
