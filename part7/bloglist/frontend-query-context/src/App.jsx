import { useContext, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router';

import Blog from './Blog';
import Blogs from './Blogs';
import NavigationMenu from './components/NavigationMenu';
import { Notice } from './components/Notice';
import { NotificationContext } from './NotificationContext';
import blogService from './services/blogs';
import loginService from './services/login';
import User from './User';
import { UserContext } from './UserContext';
import Users from './Users';

const App = () => {
  const { user, userDispatch } = useContext(UserContext);
  const setUser = (user) => {
    userDispatch({
      type: 'SET',
      payload: user,
    });
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    const userStr = window.localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    } catch (error) {
      setNotification({
        message: 'Failed to login: ' + error.toString(),
        type: 'error',
      });
    }
  };

  return (
    <div>
      <NavigationMenu />

      {notification && <Notice notice={notification} />}

      {user && <h2>blog app</h2>}

      {!user && (
        <div>
          <h2>log in to application</h2>
          {notification && <Notice notice={notification} />}
          <form onSubmit={handleLogin}>
            <div>
              <label>
                username
                <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )}

      <Routes>
        <Route path="blogs/:blogId" element={<Blog />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
        <Route index element={user ? <Blogs /> : null} />
      </Routes>
    </div>
  );
};

export default App;
