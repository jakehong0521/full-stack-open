import { useState } from 'react';

import { useQuery } from '@apollo/client/react';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [currGenre, setCurrGenre] = useState('all genres');
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: currGenre === 'all genres' ? undefined : currGenre },
  });

  if (!props.show) {
    return null;
  }

  if (booksQuery.loading) {
    return <div>Loading...</div>;
  }

  const books = booksQuery.data?.allBooks || [];

  return (
    <div>
      <h2>books</h2>

      <div>
        <span>in genre </span>
        <b>{currGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setCurrGenre(g);
            }}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;

const genres = [
  'fiction',
  'mystery',
  'non-fiction',
  'romance',
  'sci-fi',
  'all genres',
];
