import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: String,
  txids: [{ delegateStx: String, delegateStxLock: String }],
});

const model = mongoose.model("txIds", schema);

export { model as txIdTesting };
