const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();

const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }

    const user = request.user;
    if (blog.user.toString() !== user.id) {
      return response
        .status(403)
        .json({ error: "only the creator can delete a blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }
);

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  return response.json(blog);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const blog = new Blog({
    ...request.body,
    user: user.id,
  });
  await blog.save();
  user.blogs = [...user.blogs, blog.id];
  await user.save();
  return response.status(201).json(blog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  const { comment } = request.body;
  if (!comment) {
    return response.status(400).json({ error: "Comment is required" });
  }

  blog.comments = blog.comments.concat(comment);
  await blog.save();
  return response.status(201).json(blog);
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
      !request.body.url ||
      !request.body.user
    ) {
      return response
        .status(400)
        .json({ error: "Missing required properties" });
    }

    blog.author = request.body.author;
    blog.likes = request.body.likes;
    blog.title = request.body.title;
    blog.url = request.body.url;
    blog.user = request.body.user;

    const updatedBlog = await blog.save();
    return response.json(updatedBlog);
  } catch (error) {
    return response.status(400).json(error);
  }
});

module.exports = blogsRouter;
