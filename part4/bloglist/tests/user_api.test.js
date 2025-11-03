const { after, beforeEach, test } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");

const app = require("../app");
const User = require("../models/user");
const helper = require("./user_api.helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
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

after(async () => {
  await mongoose.connection.close();
});
