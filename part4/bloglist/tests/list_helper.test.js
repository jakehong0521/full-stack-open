const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("favoriteBlog", () => {
  test("of empty list is undefined", () => {
    const blogs = [];

    assert.strictEqual(listHelper.favoriteBlog(blogs), undefined);
  });

  test("when list has only one blog equals that blog", () => {
    const blog = {
      __v: 0,
      _id: "id",
      author: "author",
      likes: 521,
      title: "title",
      url: "https://jakehong0521.github.io",
    };

    assert.deepStrictEqual(listHelper.favoriteBlog([blog]), blog);
  });

  test("of a bigger list is returned right", () => {
    const blogs = [
      {
        __v: 0,
        _id: "5a422a851b54a676234d17f7",
        author: "Michael Chan",
        likes: 7,
        title: "React patterns",
        url: "https://reactpatterns.com/",
      },
      {
        __v: 0,
        _id: "5a422aa71b54a676234d17f8",
        author: "Edsger W. Dijkstra",
        likes: 5,
        title: "Go To Statement Considered Harmful",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      },
    ];

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[0]);
  });
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
