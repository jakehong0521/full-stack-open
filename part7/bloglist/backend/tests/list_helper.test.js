const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const sampleBlogs = [
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
    const blog = sampleBlogs[0];

    assert.deepStrictEqual(listHelper.favoriteBlog([blog]), blog);
  });

  test("of a bigger list is returned right", () => {
    const blogs = sampleBlogs;

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2]);
  });
});

describe("mostBlogs", () => {
  test("of empty list is undefined", () => {
    const blogs = [];

    assert.strictEqual(listHelper.mostBlogs(blogs), undefined);
  });

  test("when list has only one blog equals the author of that", () => {
    const blogs = [sampleBlogs[0]];

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: sampleBlogs[0].author,
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const blogs = sampleBlogs;

    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Edsger W. Dijkstra",
      blogs: 2,
    });
  });
});

describe("mostLikes", () => {
  test("of empty list is undefined", () => {
    const blogs = [];
    assert.strictEqual(listHelper.mostLikes(blogs), undefined);
  });

  test("when list has only one blog equals the author and likes of that", () => {
    const blogs = [sampleBlogs[0]];

    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: sampleBlogs[0].author,
      likes: sampleBlogs[0].likes,
    });
  });

  test("of a bigger list is calculated right", () => {
    const blogs = sampleBlogs;

    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    assert.strictEqual(listHelper.totalLikes(blogs), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [sampleBlogs[0]];

    assert.strictEqual(listHelper.totalLikes(blogs), sampleBlogs[0].likes);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = sampleBlogs;

    assert.strictEqual(listHelper.totalLikes(blogs), 24);
  });
});
