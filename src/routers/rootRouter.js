import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userControllers";
import { trending, search } from "../controllers/VideoControllers";
import { avatarUpload, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", trending);
rootRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(avatarUpload.single("avatar"), postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
