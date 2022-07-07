import { Schema, model, models } from "mongoose";

const Model = new Schema({
  name: { type: String, required: true },
  age: { type: Number }
});

const User = models.User ?? model("User", Model);

export default User;
