import express from "express";
import { watch, getEdit, postEdit } from "../controllers/VideoControllers";

const videoRouter = express.Router();

videoRouter.get("/:id", watch);
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);

export default videoRouter;
