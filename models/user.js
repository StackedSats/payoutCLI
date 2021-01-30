import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const schema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  stxAddress: [String],
  btcAddress: [String],
  totalStacked: { type: Number, default: 0 },
  totalBTCReward: { type: Number, default: 0 },
  pendingBTCReward: { type: Number, default: 0 },
});

const User = mongoose.model("Users", schema);

export { User };
