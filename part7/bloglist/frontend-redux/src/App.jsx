import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import { Notice } from './components/Notice';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  likeBlog,
} from './reducers/blogsReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notification = useSelector((state) => state.notification);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

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
        dispatch(setNotification(null));
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
      dispatch(
        setNotification({
          message: 'Failed to login: ' + error.toString(),
          type: 'error',
        }),
      );
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await dispatch(createBlog(blogObject));
    dispatch(
      setNotification({
        message: `A new blog "${blogObject.title}" by ${blogObject.author} added`,
        type: 'success',
      }),
    );
  };

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlogById(blogId));
  };

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog));
  };

  return (
    <div>
      {user && (
        <div>
          <h2>blogs</h2>
          {notification && <Notice notice={notification} />}
          <div>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </div>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>

          <div style={{ marginTop: '12px' }}>
            {blogs
              .toSorted((blogA, blogB) => blogB.likes - blogA.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  onDelete={handleDeleteBlog}
                  onLikeClick={() => handleLikeClick(blog)}
                  isUserCreated={user.id === blog.user}
                />
              ))}
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
    </div>
  );
};

export default App;
