const typeDefs = /* GraphQL */ `
  type Author {
    bookCount: Int!
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

  type Mutation {
    addBook(
      author: String!
      genres: [String!]!
      published: Int!
      title: String!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    dummy: Int
  }
`;

module.exports = {
  typeDefs,
};
