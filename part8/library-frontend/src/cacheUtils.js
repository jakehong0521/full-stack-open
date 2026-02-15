import { ALL_BOOKS } from './queries';

export const addBookToCache = (cache, newBook) => {
  cache.updateQuery({ query: ALL_BOOKS }, (data) => {
    if (!data) {
      return data;
    }

    const allBooks = data.allBooks;

    const isBookInCache = allBooks.some((book) => book.id === newBook.id);
    return isBookInCache ? { allBooks } : { allBooks: [...allBooks, newBook] };
  });

  newBook.genres.forEach((genre) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, (data) => {
      if (!data) {
        return data;
      }

      const allBooks = data.allBooks;

      const isBookInCache = allBooks.some((book) => book.id === newBook.id);
      return isBookInCache
        ? { allBooks }
        : { allBooks: [...allBooks, newBook] };
    });
  });
};
