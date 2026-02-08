const crypto = require("crypto");

const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Mutation: {
    addBook: async (_root, args) => {
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });

      if (args.author) {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        book.author = author._id;
      }

      return await book.save();
    },
    editAuthor: async (_root, args) => {
      const author = await Author.findOne({ _id: args.id });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      return await author.save();
    },
  },
  Query: {
    allAuthors: async (_root, args) => await Author.find({}),
    allBooks: async (_root, args) => await Book.find(),
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    dummy: () => 0,
  },
};

module.exports = {
  resolvers,
};
