import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import Blogs from './Blogs';
import Users from './Users';
import { Notice } from './components/Notice';
import { getAllBlogs } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';
import { loginUser, logoutUser, setUser } from './reducers/userReducer';
import blogService from './services/blogs';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    const userStr = window.localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(setNotification(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(
        loginUser({
          username,
          password,
        }),
      );
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Failed to login: ' + error.toString(),
          type: 'error',
        }),
      );
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser(null));
  };

  return (
    <div>
      {user && (
        <div>
          <h2>blogs</h2>
          {notification && <Notice notice={notification} />}
          <div>
            <div>{user.name} logged in</div>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      )}

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
        <Route path="users" element={<Users />} />
        <Route index element={user ? <Blogs /> : null} />
      </Routes>
    </div>
  );
};

export default App;
