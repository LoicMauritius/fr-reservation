import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id_User: Number,
  name: { first_name: String, last_name: String },
  pwd: String,
  email: String,
  age: Number,
  date_signup: Date,
  rôle: String, /* Admin / Commerçant / Product Owner */
  balance: Number,
  treasury: [{ date: Date, balance: Number }]
});

export default model('User', UserSchema);