const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
});

module.exports = mongoose.model("User", schema);
