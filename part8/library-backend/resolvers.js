const crypto = require("crypto");

const Author = require("./models/author");
const Book = require("./models/book");
const { GraphQLError } = require("graphql");

const resolvers = {
  Mutation: {
    addBook: async (_root, args) => {
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      });
      let wasAuthorCreated = false;

      if (args.author) {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          try {
            await author.save();
            wasAuthorCreated = true;
          } catch (error) {
            throw new GraphQLError(`Failed to save author: ${error.message}`, {
              extensions: {
                error,
                args,
              },
            });
          }
        }
        book.author = author._id;
      }

      try {
        await book.save();
      } catch (error) {
        if (wasAuthorCreated) {
          const result = await Author.deleteOne({ name: args.author });
        }
        throw new GraphQLError(`Failed to save book: ${error.message}`, {
          extensions: {
            error,
            args,
          },
        });
      }

      return book;
    },
    editAuthor: async (_root, args) => {
      const author = await Author.findOne({ _id: args.id });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(`Failed to update author: ${error.message}`, {
          extensions: {
            error,
            args,
          },
        });
      }

      return author;
    },
  },
  Query: {
    allAuthors: async () => await Author.find(),
    allBooks: async (_root, args) =>
      await Book.find({
        ...(args.genre && { genres: args.genre }),
      }).populate("author"),
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    dummy: () => 0,
  },
};

module.exports = {
  resolvers,
};
