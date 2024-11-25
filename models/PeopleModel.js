//C
import peopleSchema from "./PeopleSchema.js";
export const insertPeople = (userObj) => {
  return peopleSchema(userObj).save();
};
//R
export const getUserByEmail = (email) => {
  return peopleSchema.findOne({ email });
};
