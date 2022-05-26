import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`서버가 활성화 되었습니다., http://localhost/${PORT}`);
});
