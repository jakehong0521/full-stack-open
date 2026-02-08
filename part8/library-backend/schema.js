const typeDefs = /* GraphQL */ `
  type Author {
    bookCount: Int
    born: Int
    id: ID!
    name: String!
  }

  type Book {
    author: Author!
    genres: [String!]!
    id: ID!
    published: Int!
    title: String!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Mutation {
    addBook(
      author: String!
      genres: [String!]!
      published: Int!
      title: String!
    ): Book
    createUser(username: String!, favoriteGenre: String!): User
    editAuthor(name: String!, setBornTo: Int!): Author
    login(username: String!, password: String!): Token
    resetDb: Boolean
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    dummy: Int
    me: User
  }
`;

module.exports = {
  typeDefs,
};
