const config = require("../utils/config");

const mongoose = require("mongoose");

mongoose.connect(config.MONGODB_URI);

const blogSchema = mongoose.Schema({
  author: String,
  likes: Number,
  title: String,
  url: String,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
