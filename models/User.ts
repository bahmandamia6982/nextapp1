import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.models.User ?? mongoose.model("User", Schema);

export default User;
