import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook(
    $author: String!
    $genres: [String!]!
    $published: Int!
    $title: String!
  ) {
    addBook(
      author: $author
      genres: $genres
      published: $published
      title: $title
    ) {
      author
      genres
      id
      published
      title
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      id
      published
      title
    }
  }
`;
