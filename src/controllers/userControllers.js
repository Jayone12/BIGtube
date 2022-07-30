import fetch from "node-fetch";
import User from "../models/User";
import bcrypt from "bcrypt";

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
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
      avatarUrl,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  // db에서 입력한 username을 찾는다.
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력하신 이름의 회원 정보를 찾을 수 없습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "비밀번호가 틀렸습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const BASE_URL = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  return res.redirect(`${BASE_URL}?${params}`);
};

export const finishGithubLogin = async (req, res) => {
  const BASE_URL = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const tokenRequest = await (
    await fetch(`${BASE_URL}?${params}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatar_url,
        email: emailObj.email,
        username: userData.login,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("userEdit", { pageTitle: "edit" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { email, name, username, location },
    file,
  } = req;
  const exists = await User.exists({
    // 입력한 값과 일치하지 않는 ID를 조회하고
    _id: { $ne: { _id } },
    // 위에서 조회한 ID중 입력한 값과 동일한 동일한 ID가 있는지 조회한다.
    $or: [{ username }, { email }],
  });

  if (exists) {
    return res.status(400).render("userEdit", {
      pageTitle: "Edit",
      errorMessage: "This username/email is already taken.",
    });
  }
  const userUpdate = await User.findByIdAndUpdate(
    _id,
    {
      email,
      name,
      username,
      location,
      avatarUrl: file ? file.path : avatarUrl,
    },
    { new: true }
  );
  req.session.user = userUpdate;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("changePassword", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const pageTitle = "Change Password";
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("changePassword", {
      pageTitle,
      errorMessage: "비밀번호가 틀렸습니다.",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("changePassword", {
      pageTitle,
      errorMessage: "비밀번호가 동일하지 않습니다.",
    });
  }
  if (oldPassword === newPassword) {
    return res.status(400).render("changePassword", {
      pageTitle,
      errorMessage: "이전 비밀번호와 동일합니다.",
    });
  }
  user.password = newPassword;
  await user.save();

  req.session.destroy();
  return res.redirect("/login");
};

export const userProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.render("userProfile", { pageTitle: user.name, user });
};
