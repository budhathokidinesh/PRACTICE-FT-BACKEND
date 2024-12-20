import express from "express";
import {
  deleteTransactions,
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
    next(error);
  }
});

// return all transactions for the specific users
router.get("/", async (req, res, next) => {
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
    next(error);
  }
});

// Delete transactions
router.delete("/", async (req, res, next) => {
  try {
    // recieve ids[] and _id of the user
    const ids = req.body;
    const { _id } = req.userInfo;
    console.log(ids, _id);
    // Perform the deletion query
    const result = await deleteTransactions(_id, ids);
    res.json({
      status: "success",
      message: result.deletedCount + " transaction(s) has been deleted",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
