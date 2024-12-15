import express from "express";
import {
  getTransaction,
  insertTransaction,
} from "../models/transaction/TransactionModel.js";
const router = express.Router();

//insert transaction
router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    const result = await insertTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "new transaction added successfully",
        })
      : res.json({
          status: "error",
          message: "error happened while adding transactions, try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: message.error,
    });
  }
});

// return all transactions for the specific users
router.get("/", async (req, res) => {
  try {
    // get all transactions from the database
    const { _id } = req.userInfo;
    const transactions = (await getTransaction(_id)) || [];
    res.json({
      status: "success",
      message: "here are the transactions",
      transactions,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
