import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  txs: [{ type: mongoose.Schema.Types.ObjectId, ref: "rewardhistories" }],
});

const btcRewardHistory = mongoose.model("btcRewardUser", schema);
export { btcRewardHistory };
