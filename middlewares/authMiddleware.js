export const auth = (req, res, next) => {
  try {
    const isAuth = true;
    isAuth
      ? next()
      : res.status(403).json({
          error: "Unauthorized",
        });
  } catch (error) {}
};
