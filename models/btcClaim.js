import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: String,
  btcAddress: [{ btcAddress: String, value: Number }],
});

const model = mongoose.model("pending", schema);

export { model as btcClaim };
