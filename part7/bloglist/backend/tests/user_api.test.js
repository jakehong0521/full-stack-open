const { after, beforeEach, test } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");

const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./user_api.helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const users = await User.insertMany(helper.initialUsers);
  await Promise.all(
    users.map(async (user, idx) => {
      const blog = new Blog({
        author: user.name,
        likes: 100,
        title: `Blog ${idx + 1}`,
        url: `https://www.example.com/blog${idx + 1}`,
        user: user.id,
      });
      await blog.save();
      user.blogs = [...user.blogs, blog.id];
      await user.save();
    })
  );
});

test("users can be added", async () => {
  const response = await api
    .post("/api/users")
    .send({
      username: "jakehong0521",
      name: "Jake Hong",
      password: "123456",
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.username, "jakehong0521");
  assert.strictEqual(response.body.name, "Jake Hong");
});

test("users are returned as json", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const users = response.body;
  assert.strictEqual(users.length, helper.initialUsers.length);
});

test("username and password are required", async () => {
  await api
    .post("/api/users")
    .send({
      name: "Jake Hong",
      password: "123456",
    })
    .expect(400);
  await api
    .post("/api/users")
    .send({
      username: "jakehong0521",
      name: "Jake Hong",
    })
    .expect(400);
});

test("username and password must be at least 3 characters long", async () => {
  await api
    .post("/api/users")
    .send({
      username: "j",
      name: "Jake Hong",
      password: "123456",
    })
    .expect(400);
  await api
    .post("/api/users")
    .send({
      username: "jakehong0521",
      name: "Jake Hong",
      password: "1",
    })
    .expect(400);
});

test("username must be unique", async () => {
  await api
    .post("/api/users")
    .send({
      username: helper.initialUsers[0].username,
      name: "Jake Hong",
      password: "123456",
    })
    .expect(400);
});

test("users are returned with their blogs", async () => {
  const response = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const users = response.body;
  assert.strictEqual(users.length, helper.initialUsers.length);
  users.forEach((user) => {
    user.blogs.forEach((blog) => {
      assert.strictEqual(blog.author, user.name);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
