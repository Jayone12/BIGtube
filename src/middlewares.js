export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Bigtube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedUser = req.session.user;
  next();
};
