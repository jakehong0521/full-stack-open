const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: String,
  likes: {
    type: Number,
    default: 0,
  },
  title: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  comments: {
    type: [String],
    default: [],
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
