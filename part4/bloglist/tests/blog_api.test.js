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

test("if likes property is missing, it will default to 0", async () => {
  const response = await api
    .post("/api/blogs")
    .send({
      author: "Mock Author",
      title: "Mock Title",
      url: "http://mock.com",
    })
    .expect(201);

  const blog = response.body;
  assert.strictEqual(blog.likes, 0);
});

test("if title or url properties are missing, respond with status code 400 Bad Request", async () => {
  await api
    .post("/api/blogs")
    .send({
      author: "Mock Author",
      url: "http://mock.com",
    })
    .expect(400);
  await api
    .post("/api/blogs")
    .send({
      author: "Mock Author",
      title: "Mock Title",
    })
    .expect(400);
});

test("a blog can be deleted by id", async () => {
  const respBlogsBeforeDelete = await api.get("/api/blogs");
  const blogId = respBlogsBeforeDelete.body[0].id;
  await api.delete(`/api/blogs/${blogId}`).expect(204);

  const respBlogsAfterDelete = await api.get("/api/blogs");
  assert.strictEqual(
    respBlogsAfterDelete.body.length,
    helper.initialBlogs.length - 1
  );
});

test("non-existent blog cannot be deleted", async () => {
  await api.delete(`/api/blogs/non-existent-id`).expect(400);
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
