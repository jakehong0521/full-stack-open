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

blogsRouter.put("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    if (
      !request.body.author ||
      !request.body.likes ||
      !request.body.title ||
      !request.body.url
    ) {
      return response
        .status(400)
        .json({ error: "Missing required properties" });
    }

    blog.author = request.body.author;
    blog.likes = request.body.likes;
    blog.title = request.body.title;
    blog.url = request.body.url;

    const updatedBlog = await blog.save();
    return response.json(updatedBlog);
  } catch (error) {
    return response.status(400).json(error);
  }
});

module.exports = blogsRouter;
