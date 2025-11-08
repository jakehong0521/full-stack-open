const Blog = require("../models/blog");

const initialBlogs = [
  {
    author: "Jake Hong",
    likes: 5,
    title: "JH Studio",
    url: "https://jakehong0521.github.io/",
  },
  {
    author: "Junseong Hong",
    likes: 10,
    title: "Employee #1",
    url: "https://viralspace.medium.com/jake-hong-leading-development-of-our-website-working-with-new-frameworks-and-growth-as-employee-df674c8c5ffb",
  },
];

const initialUser = {
  username: "testuser",
  passwordHash: "testpassword",
  name: "Test User",
};

module.exports = {
  initialBlogs,
  mockUser: initialUser,
};
