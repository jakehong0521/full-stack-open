import { useContext, useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import { Notice } from './components/Notice';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { NotificationContext } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const [_blogs, setBlogs] = useState([]);

  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification({
        message: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
        type: 'success',
      });
    },
  });

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { notification, notificationDispatch } =
    useContext(NotificationContext);
  const setNotification = (notification) => {
    notificationDispatch({
      type: 'SET',
      payload: notification,
    });
  };

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
  };

  const handleDeleteBlog = async (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const handleLikeClick = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.put(updatedBlog);
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
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
