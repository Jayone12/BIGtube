import Video from "../models/Video";

export const trending = async (req, res) => {
  // 데이터 베이스에서 video를 검석핸다.
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: "비디오 페이지" });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("videoEdit", { pageTitle: "영상 수정페이지" });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  // 새로운 비디오를 생성
  await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });

  return res.redirect("/");
};
