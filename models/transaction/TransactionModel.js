import TransactionSchema from "./TransactionSchema.js";
import transactionSchema from "./TransactionSchema.js";

//insert querries
export const insertTransaction = (obj) => {
  return transactionSchema(obj).save();
};

export const getTransaction = (userId) => {
  if (!userId) {
    throw new error("userId is drequired");
  }
  return transactionSchema.find({ userId });
};

// Delete  querries
export const deleteTransactions = (userId, idsToDelete) => {
  return TransactionSchema.deleteMany({ userId, _id: { $in: idsToDelete } });
};
