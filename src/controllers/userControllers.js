import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Create Account" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 동일하지 않습니다.",
    });
  }

  // 유저네임 또는 이메일 중 한가지라고 중복되는것을 찾는다.
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 사용중인 아이디 또는 이름입니다.",
    });
  }
  await User.create({
    name,
    email,
    username,
    password,
    location,
  });
  res.redirect("/login");
};

export const login = (req, res) => {
  res.send("login");
};
