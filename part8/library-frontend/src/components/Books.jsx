import { useState } from 'react';

import { useQuery } from '@apollo/client/react';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('all genres');
  const query = useQuery(ALL_BOOKS, {
    variables: { genre: undefined },
  });

  if (!props.show) {
    return null;
  }

  if (query.loading) {
    return <div>Loading...</div>;
  }

  const books = query.data?.allBooks || [];
  const genres = [
    ...new Set(
      books
        .map((book) => book.genres)
        .flat()
        .toSorted(),
    ),
    'all genres',
  ];
  const booksInCurrGenre =
    genre === 'all genres'
      ? books
      : books.filter((book) => book.genres.includes(genre));

  return (
    <div>
      <h2>books</h2>

      <div>
        <span>in genre </span>
        <b>{genre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksInCurrGenre.map((book) => (
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
              setGenre(g);
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
