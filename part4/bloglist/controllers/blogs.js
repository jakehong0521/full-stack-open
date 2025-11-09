const jwt = require("jsonwebtoken");

const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFromRequest = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

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
  const decodedToken = jwt.verify(
    getTokenFromRequest(request),
    process.env.SECRET
  );
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" });
  }

  const blog = new Blog({
    ...request.body,
    user: user.id,
  });
  await blog.save();
  user.blogs = [...user.blogs, blog.id];
  await user.save();
  const result = await blog.populate("user", { name: 1, username: 1 });
  return response.status(201).json(result);
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
