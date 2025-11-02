const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  } catch (error) {
    return response.status(400).json(error);
  }
});

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    return response.status(400).json(error);
  }
});

module.exports = blogsRouter;
