import { getUserByEmail } from "../models/PeopleModel.js";
import { verifyJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const result = verifyJWT(authorization);
    // -validate if the token is validate
    if (result?.email) {
      const user = await getUserByEmail(result.email);
      if (user?._id) {
        // user is authorized

        //store user info in the req headers
        user.password = undefined;
        req.userInfo = user;
        return next();
      }
    }
    res.status(403).json({
      error: "Unauthorized",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
