import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// also we write timstamp true for time or date or whatever
const Url = mongoose.model("Url", urlSchema);

export default Url;

