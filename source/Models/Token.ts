import mongoose from "mongoose";

const Object = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
});

const Token = mongoose.model("Token", Object);

export default Token;
