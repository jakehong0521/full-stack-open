const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    assert.strictEqual(listHelper.totalLikes(blogs), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const numLikes = 521;
    const blogs = [
      {
        __v: 0,
        _id: "id",
        author: "author",
        likes: numLikes,
        title: "title",
        url: "https://jakehong0521.github.io",
      },
    ];

    assert.strictEqual(listHelper.totalLikes(blogs), numLikes);
  });

  test("of a bigger list is calculated right", () => {
    const numLikes0 = 521;
    const numLikes1 = 521;
    const blogs = [
      {
        __v: 0,
        _id: "id0",
        author: "author",
        likes: numLikes0,
        title: "title",
        url: "https://jakehong0521.github.io",
      },
      {
        __v: 0,
        _id: "id1",
        author: "author",
        likes: numLikes1,
        title: "title",
        url: "https://jakehong0521.github.io",
      },
    ];

    assert.strictEqual(listHelper.totalLikes(blogs), numLikes0 + numLikes1);
  });
});
