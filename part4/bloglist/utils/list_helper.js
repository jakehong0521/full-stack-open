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

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
