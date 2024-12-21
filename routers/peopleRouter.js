import express from "express";
const router = express.Router();
import { getUserByEmail, insertPeople } from "../models/PeopleModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { signJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";

//Student Signup
router.post("/", async (req, res, next) => {
  try {
    // Getting people information
    // encrypting the user password
    req.body.password = hashPassword(req.body.password);
    const user = await insertPeople(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created",
        })
      : res.json({
          status: "error",
          message:
            "Error happened while creating the account. please try later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "There is another user have used this email, try to login with anoter email.";
    }
    error.statusCode = 200;
    next(error);
  }
});

//People Login
router.post("/login", async (req, res, next) => {
  try {
    //1. recieve email and password
    const { email, password } = req.body;
    // console.log(email, password);
    if (email && password) {
      //2. Find the user by email
      const user = await getUserByEmail(email);
      if (user?._id) {
        //4. match the password
        const isMatched = comparePassword(password, user.password);
        if (isMatched) {
          // the user actually authenticated
          //5. JWT and store the store the jwt in db and return the user {} with jwt token
          const accessJWT = signJWT({
            email: email,
          });
          user.password = undefined;
          res.json({
            status: "success",
            message: "Login successful",
            user,
            accessJWT,
          });
          return;
        }
      }
    }

    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// User profile from the accessJWT
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    res.json({
      status: "success",
      message: "Here is the user profile",
      user,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
