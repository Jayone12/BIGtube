import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));

// middleware
const logger = morgan("dev");
app.use(logger);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => {
  console.log(`서버가 활성화 되었습니다. http://localhost:${PORT}`);
});
