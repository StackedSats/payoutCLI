import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: String,
  date: [{ type: Date, default: Date.now() }],
  reward: [Number],
});

const model = mongoose.model("rewardGraph", schema);

export { model as BtcRewardGraphs };
