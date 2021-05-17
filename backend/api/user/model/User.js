const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first: {
      type: String,
      required: [true,"No First Name..."]
  },
  last: {
      type: String,
      required: [true,"No Last Name..."]
  },
  state: {
      type: Boolean,
      required: true
  },
  logs: {
      type: Array
  }

});

const User = mongoose.model("User", userSchema);
module.exports = User;