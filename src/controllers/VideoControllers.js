let fakeData = [
  {
    title: "첫번째 비디오",
    description: "이 비디오는 테스트입니다.",
    views: 10,
    rating: 5,
    comments: 10,
    id: 1,
  },
  {
    title: "두번째 비디오",
    description: "이 비디오는 테스트입니다.",
    views: 10,
    rating: 5,
    comments: 10,
    id: 2,
  },
  {
    title: "세번째 비디오",
    description: "이 비디오는 테스트입니다.",
    views: 10,
    rating: 5,
    comments: 10,
    id: 3,
  },
];

export const trending = (req, res) => {
  res.render("home", { pageTitle: "home", fakeData });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = fakeData[id - 1];
  res.render("watch", { pageTitle: "비디오 페이지", video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = fakeData[id - 1];
  res.render("videoEdit", { pageTitle: "영상 수정페이지", video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const video = fakeData[id - 1];
  const { title, description } = req.body;
  video.title = title;
  video.description = description;
  res.redirect(`/videos/${id}`);
};
