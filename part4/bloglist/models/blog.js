const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  author: String,
  likes: Number,
  title: String,
  url: String,
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
