import { useQuery } from '@apollo/client/react';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
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

  return (
    <div>
      <h2>books</h2>

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
    </div>
  );
};

export default Books;
