import mongoose from "mongoose";

// mongo db 연결, {options}
mongoose.connect("mongodb://127.0.0.1:27017/Bigtube", {});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

// db 연결시 오류 표시
db.on("error", handleError);
// on과의 차이점은 on 여러번 once는 단 한번만
db.once("open", handleOpen);
