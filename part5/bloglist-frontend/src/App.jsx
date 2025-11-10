import { useEffect, useRef, useState } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import { Notice } from "./components/Notice";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notice, setNotice] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userStr = window.localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => {
        setNotice(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (error) {
      setNotice({
        message: "Failed to login: " + error.toString(),
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await blogService.create(blogObject);
    await blogService.getAll().then((blogs) => setBlogs(blogs));
    setNotice({
      message: `A new blog "${blogObject.title}" by ${blogObject.author} added`,
      type: "success",
    });
  };

  const handleDeleteBlog = async (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  return (
    <div>
      {user && (
        <div>
          <h2>blogs</h2>
          {notice && <Notice notice={notice} />}
          <div>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </div>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>

          <div style={{ marginTop: "12px" }}>
            {blogs
              .toSorted((blogA, blogB) => blogB.likes - blogA.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  onDelete={handleDeleteBlog}
                  isUserCreated={user.id === blog.user.id}
                />
              ))}
          </div>
        </div>
      )}

      {!user && (
        <div>
          <h2>log in to application</h2>
          {notice && <Notice notice={notice} />}
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
