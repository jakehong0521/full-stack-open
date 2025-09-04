const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const favoriteBlog = (blogs) => {
  let favorite;

  for (const blog of blogs) {
    if (!favorite || blog.likes > favorite.likes) {
      favorite = blog;
    }
  }

  return favorite;
};

const mostBlogs = (blogs) => {
  let author;
  let count = 0;

  blogs.reduce((countByAuthor, blog) => {
    countByAuthor[blog.author] = (countByAuthor[blog.author] || 0) + 1;
    if (countByAuthor[blog.author] > count) {
      author = blog.author;
      count = countByAuthor[blog.author];
    }
    return countByAuthor;
  }, {});

  if (author) {
    return { author, blogs: count };
  }

  return undefined;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes,
};
