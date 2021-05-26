const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
      type: String,
      required: [true,"No Name..."]
  },
  state: {
      type: String,
      required: true
  },
  logs: {
      type: Array
  }

});

const User = mongoose.model("User", userSchema);
module.exports = User;