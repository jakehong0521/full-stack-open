import { useState } from 'react';

import { useMutation } from '@apollo/client/react';

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBookMutation] = useMutation(ADD_BOOK, {
    refetchQueries: [ALL_AUTHORS],
    update: (cache, response) => {
      const updatedBook = response.data.addBook;

      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        const isBookInCache = allBooks.some(
          (book) => book.id === updatedBook.id,
        );
        return isBookInCache
          ? { allBooks }
          : { allBooks: [...allBooks, updatedBook] };
      });

      updatedBook.genres.forEach((genre) => {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre } },
          ({ allBooks }) => {
            const isBookInCache = allBooks.some(
              (book) => book.id === updatedBook.id,
            );
            return isBookInCache
              ? { allBooks }
              : { allBooks: [...allBooks, updatedBook] };
          },
        );
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBookMutation({
      variables: {
        author,
        genres,
        published: parseInt(published),
        title,
      },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
