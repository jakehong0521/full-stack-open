const User = require("../models/user");

const initialUsers = [
  {
    username: "jakehong0521-v0",
    name: "Jake Hong-v0",
    passwordHash: "123456-v0",
  },
  {
    username: "jakehong0521-v1",
    name: "Jake Hong-v1",
    passwordHash: "123456-v1",
  },
];

module.exports = {
  initialUsers,
};
