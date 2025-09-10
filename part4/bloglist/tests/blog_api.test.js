const { after, beforeEach, test } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");

const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./blog_api.helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const resp = await Blog.insertMany(helper.initialBlogs);
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
  await api
    .post("/api/blogs")
    .send({
      author: "Mock Author",
      likes: 0,
      title: "Mock Title",
      url: "http://mock.com",
    })
    .expect(201);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((blog) => blog.title);
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  assert(titles.includes("Mock Title"));
});

after(async () => {
  await mongoose.connection.close();
});
