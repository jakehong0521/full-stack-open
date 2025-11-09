const { after, beforeEach, test } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const jwt = require("jsonwebtoken");

const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./blog_api.helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const user = new User(helper.mockUser);
  await user.save();
  await Blog.insertMany(
    helper.initialBlogs.map((blog) => ({ ...blog, user: user.id }))
  );
});

test("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  assert(titles.includes(helper.initialBlogs[0].title));
});

test("unique identifier property of the blog posts is named id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  blogs.forEach((blog) => {
    assert("id" in blog);
    assert(!("_id" in blog));
  });
});

test("a valid blog can be added", async () => {
  const user = await User.findOne({ username: helper.mockUser.username });
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  const newBlog = {
    title: "New Blog Title",
    author: "New Author",
    url: "http://new-url.com",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  assert(titles.includes("New Blog Title"));
});

test("adding a valid blog fails with status code 401 if token is not provided", async () => {
  const newBlog = {
    title: "New Blog Title",
    author: "New Author",
    url: "http://new-url.com",
    likes: 5,
  };
  await api.post("/api/blogs").send(newBlog).expect(401);
});

test("a blog can be deleted by id", async () => {
  const user = await User.findOne({ username: helper.mockUser.username });
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  const respBlogsBeforeDelete = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  const blogId = respBlogsBeforeDelete.body[0].id;
  await api
    .delete(`/api/blogs/${blogId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const respBlogsAfterDelete = await api.get("/api/blogs");
  assert.strictEqual(
    respBlogsAfterDelete.body.length,
    helper.initialBlogs.length - 1
  );
});

test("non-existent blog cannot be deleted", async () => {
  const user = await User.findOne({ username: helper.mockUser.username });
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  await api
    .delete(`/api/blogs/non-existent-id`)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

test("a blog can be updated by id", async () => {
  const respBlogs = await api.get("/api/blogs");
  const blogId = respBlogs.body[0].id;
  const updatedBlog = (
    await api
      .put(`/api/blogs/${blogId}`)
      .send({
        author: "Updated Author",
        likes: 10,
        title: "Updated Title",
        url: "http://updated-url.com",
      })
      .expect(200)
  ).body;

  assert.strictEqual(updatedBlog.author, "Updated Author");
  assert.strictEqual(updatedBlog.likes, 10);
  assert.strictEqual(updatedBlog.title, "Updated Title");
  assert.strictEqual(updatedBlog.url, "http://updated-url.com");
});

test("non-existent blog cannot be updated", async () => {
  await api
    .put(`/api/blogs/non-existent-id`)
    .send({
      author: "Updated Author",
      likes: 10,
      title: "Updated Title",
      url: "http://updated-url.com",
    })
    .expect(400);
});

after(async () => {
  await mongoose.connection.close();
});
