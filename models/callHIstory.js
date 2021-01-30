import mongoose from "mongoose";

const schema = mongoose.Schema({
  functionName: {
    required: true,
    type: String,
  },
  stxAddress: {
    require: true,
    type: String,
  },
  fee: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("CallHistory", schema);
export { model };
