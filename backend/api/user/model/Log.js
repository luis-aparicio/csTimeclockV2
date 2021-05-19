const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  logID: {
      type:Number,
  },
  date: {
      type: String,
      required: [true,"No date"]
  },
  milliSeconds: {
      type: Number,
      required: [true,"No Last Name..."]
  },
  state: {
      type: Boolean,
      required: true
  }

});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;