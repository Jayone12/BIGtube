import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import { localsMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/Bigtube" }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;
