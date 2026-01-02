const { after, beforeEach, test } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");

const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test("login succeeds with correct credentials", async () => {
  const newUser = {
    username: "jakehong0521",
    name: "Jake Hong",
    password: "password123",
  };

  await api.post("/api/users").send(newUser).expect(201);

  const response = await api
    .post("/api/login")
    .send({ username: newUser.username, password: newUser.password })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert(response.body.token);
  assert.strictEqual(response.body.username, newUser.username);
  assert.strictEqual(response.body.name, newUser.name);
});

after(async () => {
  await mongoose.connection.close();
});
