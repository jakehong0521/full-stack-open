const crypto = require("crypto");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const masterPassword = "secret";

const resolvers = {
  Mutation: {
    addBook: async (_root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

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

      return book.populate("author");
    },
    createUser: async (root, args) => {
      const user = new User(args);

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            args: args.username,
            error,
          },
        });
      });
    },
    editAuthor: async (_root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

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
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== masterPassword) {
        throw new GraphQLError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    resetDb: async (root, args) => {
      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});

      return true;
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
    me: async (_root, _args, context) => context.currentUser,
  },
};

module.exports = {
  resolvers,
};
