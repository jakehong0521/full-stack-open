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
      author {
        name
      }
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
  query ($genre: String) {
    allBooks(genre: $genre) {
      author {
        born
        id
        name
      }
      id
      genres
      published
      title
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      favoriteGenre
      id
      username
    }
  }
`;

export const SET_BIRTHYEAR = gql`
  mutation SetBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      born
      id
      name
    }
  }
`;
