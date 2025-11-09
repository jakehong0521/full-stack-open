import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      setError("Failed to login: " + error.toString());
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    await blogService.create({ title, author, url });
    await blogService.getAll().then((blogs) => setBlogs(blogs));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      {user && (
        <div>
          <h2>blogs</h2>
          <div>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </div>

          <h2>create new</h2>
          <form onSubmit={handleCreateBlog}>
            <div>
              <label>
                title:{" "}
                <input
                  onChange={({ target }) => setTitle(target.value)}
                  value={title}
                />
              </label>
            </div>
            <div>
              <label>
                author:{" "}
                <input
                  onChange={({ target }) => setAuthor(target.value)}
                  value={author}
                />
              </label>
            </div>
            <div>
              <label>
                url:{" "}
                <input
                  onChange={({ target }) => setUrl(target.value)}
                  value={url}
                />
              </label>
            </div>
            <button type="submit">create</button>
          </form>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {!user && (
        <div>
          <h2>log in to application</h2>
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
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default App;
