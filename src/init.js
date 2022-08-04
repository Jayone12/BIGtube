import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`서버가 활성화 되었습니다. http://localhost:${PORT}`);

app.listen(PORT, handleListening);
