import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS, ME } from '../queries';

const RecommendedBooks = (props) => {
  const currUserQuery = useQuery(ME, {
    skip: !props.token || !props.show,
  });
  const booksQuery = useQuery(ALL_BOOKS, {
    skip: !currUserQuery.data?.me,
    variables: {
      genre: currUserQuery.data?.me?.favoriteGenre,
    },
  });

  if (!props.show) {
    return null;
  }

  if (currUserQuery.loading) {
    return <div>Loading current user info...</div>;
  }

  if (booksQuery.loading) {
    return <div>Loading recommended books...</div>;
  }

  return (
    <div>
      <h3>recommendations</h3>

      <div>
        books in your favorite genre{' '}
        <b>{currUserQuery.data.me.favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksQuery.data.allBooks.map((book) => (
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

export default RecommendedBooks;
