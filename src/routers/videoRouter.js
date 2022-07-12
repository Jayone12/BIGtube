import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/VideoControllers";

const videoRouter = express.Router();

// 몽고 db에서 자동 생성되는 ID 는 16진수로 0~9 a~f까지 24자로 이루어져 있다.
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
