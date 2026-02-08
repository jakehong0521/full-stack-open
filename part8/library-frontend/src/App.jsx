import { useState } from 'react';

import { useApolloClient } from '@apollo/client/react';

import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import RecommendedBooks from './components/RecommendedBooks';
import { localStorageKeyDict } from './const';

const defaultPage = 'authors';

const App = () => {
  const [page, setPage] = useState(defaultPage);
  const [token, setToken] = useState(
    localStorage.getItem(localStorageKeyDict.token),
  );
  const client = useApolloClient();

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem(localStorageKeyDict.token, newToken);
    setPage(defaultPage);
  };

  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyDict.token);
    setToken(null);
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>

        {token && (
          <button onClick={() => setPage('recommended')}>recommended</button>
        )}

        {token ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <RecommendedBooks show={page === 'recommended'} token={token} />

      <Login handleLogin={handleLogin} show={page === 'login'} />
    </div>
  );
};

export default App;
