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

describe("mostBlogs", () => {
  test("of empty list is undefined", () => {
    const blogs = [];

    assert.strictEqual(listHelper.mostBlogs(blogs), undefined);
  });

  test("when list has only one blog equals the author of that", () => {
    const blogs = [
      {
        __v: 0,
        _id: "id",
        author: "author",
        likes: 521,
        title: "title",
        url: "https://jakehong0521.github.io",
      },
    ];

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "author",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
    ];

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Edsger W. Dijkstra",
      blogs: 2,
    });
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
