import mongoose from "mongoose";

const Object = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["master", "admin", "user"],
  },
  age: { type: Number },
});

const User = mongoose.model("User", Object);

export default User;
